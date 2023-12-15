"use client"

import Link from "next/link"
import { useNavRoutes } from "@/hooks/useNavRoutes"
import type { TNavRoute } from "@/hooks/useNavRoutes"

type TNavLinksProps = {
  isMobile?: boolean
}

const NavLinks = ({ isMobile = false }: TNavLinksProps) => {
  const { navRoutes, conversationId, conversationIsOpen } = useNavRoutes()

  // NavLinks not rendered on mobile when a conversation is open
  if (isMobile && conversationIsOpen) return null

  return navRoutes?.map((navRoute) => {
    return <LinkAs key={navRoute.id} navRoute={navRoute} />
  })
}

export default NavLinks

type TLinkAsProps = { navRoute: TNavRoute }

const LinkAs = ({ navRoute }: TLinkAsProps) => {
  const { label, icon: Icon, ...rest } = navRoute

  const onClick = rest?.onClick
  const href = rest?.href
  const isLink = href != undefined

  return (
    <div
      className='
      text-gray-600
      hover:text-blue-700
      hover:scale-110
      active:scale-[1.015]
      transition duration-300 ease-in-out'
    >
      {isLink ? (
        <Link
          href={href}
          className={`flex items-center ${rest.active ? "text-blue-600" : ""}`}
        >
          <Icon className='w-10 h-10' />
          <span className='sr-only'>{label}</span>
        </Link>
      ) : (
        <button onClick={onClick} className='flex items-center'>
          <Icon className='w-10 h-10' />
          <span className='sr-only'>{label}</span>
        </button>
      )}
    </div>
  )
}
