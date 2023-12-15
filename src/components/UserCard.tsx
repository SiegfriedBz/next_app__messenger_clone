import type { TUser } from "@/lib/types"
import Avatar from "./Avatar"
import { createConversation } from "@/lib/server-utils"
import StartConversationButton from "./StartConversationButton"
import { redirect } from "next/navigation"

type TProps = {
  user: TUser
}

const UserCard = ({ user }: TProps) => {
  // server actions
  // create 1:1 conversation
  const onStartConversation = async () => {
    "use server"

    const newConversation = await createConversation({
      userId: user.id,
    })

    if (!newConversation) {
      throw new Error("failed to create new conversation")
    }
    // refetch conversations during the same server "api route call"
    // revalidatePath("/conversations")

    // redirect to conversation page
    redirect(`/conversations/${newConversation.id}`)
  }

  return (
    <div
      className='w-full 
        flex items-center 
        gap-x-4
        md:gap-x-8 px-4 py-2 
        text-gray-700 
        rounded-lg 
        border border-gray-200 
        hover:bg-gray-200 hover:shadow-md 
        hover:scale-[1.03] 
        active:scale-[1.01]
        transition duration-300 ease-in-out'
    >
      <Avatar userImage={user.image} wrapperClassName='h-10 w-10' />
      <span className='whitespace-nowrap'>{user.name}</span>

      <div className='ms-auto'>
        <StartConversationButton onStartConversation={onStartConversation} />
      </div>
    </div>
  )
}

export default UserCard
