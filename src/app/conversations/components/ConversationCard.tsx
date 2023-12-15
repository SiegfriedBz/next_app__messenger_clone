import type { TConversation } from "@/lib/types"

type TProps = {
  conversation: TConversation
}
const ConversationCard = ({ conversation }: TProps) => {
  return <div>{JSON.stringify(conversation)}</div>
}

export default ConversationCard
