import React from "react"
import prismaClient from "@/lib/prismaClient"

type TProps = {
  params: {
    id: string
  }
}

const ConversationPage = async ({ params }: TProps) => {
  const conversationId = params.id

  const conversation = await prismaClient.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      users: true,
    },
  })
  console.log("conversationId", conversationId)
  return (
    <div>
      ConversationPage
      {conversation?.users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}

export default ConversationPage
