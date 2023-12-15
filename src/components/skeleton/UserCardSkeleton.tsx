import Avatar from "../Avatar"
import StartConversationButton from "../StartConversationButton"

const UserCardSkeleton = () => {
  return (
    <div
      className='w-full 
        flex items-center 
        gap-x-4
        md:gap-x-8 px-4 py-2 
        text-gray-700 
        rounded-lg 
        border border-gray-200 
        animate-pulse
       '
    >
      <Avatar wrapperClassName='h-10 w-10' />
      <SpanSkeleton />

      <div className='ms-auto'>
        <StartConversationButton />
      </div>
    </div>
  )
}

export default UserCardSkeleton

const SpanSkeleton = () => {
  return <span className='w-20 h-4 bg-gray-300 rounded-md animate-pulse' />
}
