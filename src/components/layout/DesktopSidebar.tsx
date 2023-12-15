import NavLinks from "./NavLinks"
import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import Avatar from "../Avatar"
import UserListSkeleton from "../skeleton/UserListSkeleton"
import UserList from "../UserList"

const DesktopSidebar = async () => {
  // get current user session
  const session = await getServerSession(authOptions)
  const currentUserImage = session?.user?.image

  return (
    <div className='flex h-full w-1/3'>
      {/* left side bar */}
      <aside
        className='hidden 
          w-fit h-full
          lg:flex lg:flex-col
          border border-gray-200 
          rounded-lg
        '
      >
        <nav className='h-full p-4 w-full'>
          <ul className='flex flex-col space-y-8'>
            <NavLinks />
          </ul>
        </nav>

        <Avatar userImage={currentUserImage} wrapperClassName='ms-4 mb-4' />
      </aside>

      {/* UserList */}
      <section className='flex flex-col h-full w-full py-4 mx-2'>
        <h2
          className='mb-4 
          px-4 py-2
          text-white/90 tracking-tight text-xl
          bg-gradient-to-r
          from-blue-500
          to-blue-400
          font-semibold
          rounded-lg
        '
        >
          Users
        </h2>
        <Suspense fallback={<UserListSkeleton />}>
          <UserList />
        </Suspense>
      </section>
    </div>
  )
}

export default DesktopSidebar
