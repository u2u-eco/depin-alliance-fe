"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const listMenu = [
  { id: 1, link: '/home', title: 'Contribute' },
  { id: 2, link: '/', title: 'Upgrade' },
  { id: 3, link: '/', title: 'Mission' },
  { id: 4, link: '/', title: 'Invite' },
  { id: 5, link: '/', title: 'Clan' },
]

const CustomNavbar = () => {
  const pathName = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 p-1.5 bg-gray-900 flex space-x-1.5 z-10 [clip-path:_polygon(24px_0%,100%_0%,100%_100%,0_100%,_0_24px);]">
      {listMenu.map(item => (
        <Link href={item.link} className={`flex-1 px-4 pt-[18px] pb-3 space-y-2.5 text-center transition-all [clip-path:_polygon(24px_0%,100%_0%,100%_100%,0_100%,_0_24px);] rounded-md ${pathName === item.link ? 'bg-white' : 'bg-gray-950 hover:bg-gray-800'}`} key={item.id}>
          <img className="size-4 mx-auto" src={`/assets/images/icons/icon-star-circle-${pathName === item.link ? 'black' : 'gray'}.svg`} alt="Icon Start" />
          <span className={`text-[9px] font-semibold ${pathName === item.link ? 'text-black' : 'text-gray-450'}`}>{item.title}</span>
        </Link>
      ))}
    </div>
  )
}

export default CustomNavbar