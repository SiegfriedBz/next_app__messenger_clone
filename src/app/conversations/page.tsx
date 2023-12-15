import { Suspense } from "react"
import ConversationsList from "./components/ConversationsList"

const ConversationsPage = () => {
  return (
    <div>
      Conversations
      <Suspense fallback={<div>Loading...</div>}>
        <ConversationsList />
      </Suspense>
    </div>
  )
}

export default ConversationsPage
