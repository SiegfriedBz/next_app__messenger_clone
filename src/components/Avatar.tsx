"use client"

import { useState } from "react"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

type TAvatarProps = {
  userImage?: string | null | undefined
  wrapperClassName?: string
}

const Avatar = ({ userImage, wrapperClassName = "" }: TAvatarProps) => {
  const [isActive, setisActive] = useState(true)

  return (
    <div
      className={twMerge(
        ` relative
          flex items-center justify-center
          w-12 h-12
          rounded-full
          ring-1 ring-gray-300
          shadow-gray-300
          shadow-xl
        `,
        wrapperClassName
      )}
    >
      <Image
        src={userImage ? userImage : "/images/empty-avatar.jpg"}
        alt='User Avatar'
        fill={true}
        className='rounded-full object-cover'
      />

      {isActive ? (
        <div className='absolute z-50 -right-[0.15rem] -top-[0.15rem] ring-1 ring-green-500 rounded-full bg-green-600 animate-pulse h-4 w-4' />
      ) : null}
    </div>
  )
}

export default Avatar
