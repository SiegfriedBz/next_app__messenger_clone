import type { TUser } from "@/lib/types"
import UserCard from "./UserCard"
import { getUsers } from "@/lib/server-utils"

const UserList = async () => {
  // get all users except the current user
  const users: TUser[] = await getUsers()

  return (
    <ul className='flex flex-col gap-y-2 lg:gap-y-4'>
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  )
}

export default UserList
