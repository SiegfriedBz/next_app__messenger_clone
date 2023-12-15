import React from "react"
import UserCardSkeleton from "./UserCardSkeleton"

const UserListSkeleton = () => {
  return (
    <ul className='flex flex-col gap-y-2 lg:gap-y-4'>
      {Array.from({ length: 8 }).map((_, i) => {
        return (
          <li key={i}>
            <UserCardSkeleton />
          </li>
        )
      })}
    </ul>
  )
}

export default UserListSkeleton
