"use client"

import { HiChat } from "react-icons/hi"

type TProps = {
  onStartConversation?: () => void
}

const StartConversationButton = ({ onStartConversation }: TProps) => {
  return (
    <button
      className='group'
      type='button'
      onClick={onStartConversation ? () => onStartConversation() : () => {}}
    >
      <HiChat className='w-6 h-6 text-gray-600 group-hover:text-blue-500   group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-in-out' />
    </button>
  )
}

export default StartConversationButton
