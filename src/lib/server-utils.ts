import "server-only"

import { unstable_cache } from "next/cache"
import prismaClient from "./prismaClient"
import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"
import type { TUser, TConversation } from "./types"

/** to use in Server Components */

/** getCurrentUserId from DB  */
const getCurrentUserId = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Current User session required.")
  }

  const currentUser = await prismaClient.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  console.log("currentUser", currentUser)

  return currentUser?.id
}

/** get all users except the current user */
export const getUsers = unstable_cache(async () => {
  try {
    // get currentUserId from DB
    const currentUserId = await getCurrentUserId()

    if (!currentUserId) return []

    const users: TUser[] = await prismaClient.user.findMany({
      where: {
        NOT: {
          id: currentUserId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return users
  } catch (error) {
    console.log(error)
    return []
  }
})

/** get all conversations of the current user */
export const getCurrentUserConversations = unstable_cache(async () => {
  try {
    // get currentUserId from DB
    const currentUserId = await getCurrentUserId()

    if (!currentUserId) return []

    const userConversations: TConversation[] =
      await prismaClient.conversation.findMany({
        where: {
          userIds: { has: currentUserId },
        },
        include: {
          users: true,
          messages: {
            include: {
              author: true,
              seenByUsers: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      })

    return userConversations
  } catch (error) {
    console.log(error)
    return []
  }
})

/** create Conversation */
export type TCreateConversationProps = {
  userId?: TUser["id"]
  isGroup?: boolean
  groupMembersIds?: string[]
  groupName?: string
  groupDescription?: string
}

export const createConversation = unstable_cache(
  async (params: TCreateConversationProps) => {
    try {
      const { userId, isGroup, groupMembersIds, groupName, groupDescription } =
        params

      // get currentUserId from DB
      const currentUserId = await getCurrentUserId()

      if (!currentUserId) {
        throw new Error("Current user id needed to create a new conversation.")
      }

      // create conversation
      let conversation: TConversation | null = null

      if (userId && !isGroup) {
        // 1-1 conversation
        // check if a non-group conversation already exists between the two users
        const existingConversations = await prismaClient.conversation.findMany({
          where: {
            AND: [
              { isGroup: false },
              {
                OR: [
                  { userIds: { equals: [currentUserId, userId] } },
                  {
                    userIds: { equals: [userId, currentUserId] },
                  },
                ],
              },
            ],
          },
          include: {
            users: true,
          },
        })
        if (existingConversations.length > 0) {
          // return the existing conversation
          return existingConversations[0]
        }

        // create a new conversation between the two users
        conversation = await prismaClient.conversation.create({
          data: {
            users: {
              connect: [{ id: currentUserId }, { id: userId }],
            },
          },
          include: {
            users: true,
          },
        })
      } else if (isGroup) {
        // group conversation
        if (!groupMembersIds || groupMembersIds?.length < 2)
          throw new Error(
            "At least 3 members are required to create a Group Conversation."
          )

        conversation = await prismaClient.conversation.create({
          data: {
            isGroup,
            users: {
              connect: [
                { id: currentUserId },
                ...groupMembersIds.map((id) => ({ id })),
              ],
            },
            name: groupName,
            description: groupDescription,
          },
          include: {
            users: true,
          },
        })
      }
      if (!conversation)
        throw new Error(
          "Something went wrong when creating the new conversation, please try again later"
        )

      return conversation
    } catch (error) {
      console.log(error)
    }
  }
)
