// get types from prisma schema
import type {
  User as TUser,
  Message as TMessage,
  Conversation as TConversation,
} from "@prisma/client"

export type { TUser, TMessage, TConversation }
