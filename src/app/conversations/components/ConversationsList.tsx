import { getCurrentUserConversations } from "@/lib/server-utils"
import ConversationCard from "./ConversationCard"
import type { TConversation } from "@/lib/types"

const ConversationsList = async () => {
  const conversations: TConversation[] = await getCurrentUserConversations()

  return (
    <ul>
      {conversations?.map((conversation) => {
        return (
          <li key={conversation.id}>
            <ConversationCard conversation={conversation} />
          </li>
        )
      })}
    </ul>
  )
}

export default ConversationsList
