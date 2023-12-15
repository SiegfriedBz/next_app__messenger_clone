import { useMemo } from "react"
import { usePathname, useParams } from "next/navigation"
import { signOut } from "next-auth/react"
import { HiChat } from "react-icons/hi"
import { HiArrowRightOnRectangle, HiUsers } from "react-icons/hi2"
import type { IconType } from "react-icons"

export type TNavRoute = { id: number; label: string; icon: IconType } & (
  | {
      href: string
      active: boolean
      onClick?: undefined
    }
  | {
      onClick: () => Promise<undefined>
      href?: undefined
      active?: undefined
    }
)

export const useNavRoutes = () => {
  const pathName = usePathname()
  const params = useParams()

  const conversationId = params?.conversationId as string
  const conversationIsOpen = !!conversationId

  const navRoutes: TNavRoute[] = useMemo(() => {
    return [
      {
        id: 1,
        label: "Chat",
        icon: HiChat,
        href: "/conversations",
        active: pathName === "/conversations" || conversationIsOpen,
      },
      {
        id: 2,
        label: "Users",
        icon: HiUsers,
        href: "/users",
        active: pathName === "/users",
      },
      {
        id: 3,
        label: "Logout",
        icon: HiArrowRightOnRectangle,
        onClick: () => signOut(),
      },
    ]
  }, [pathName, conversationIsOpen])

  return { navRoutes, conversationId, conversationIsOpen }
}
