"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const listMenu = [
  { id: 1, link: '/upgrade', title: 'upgrade' },
  { id: 2, link: '/mission', title: 'mission' },
  { id: 3, link: '/home', title: 'contribute' },
  { id: 4, link: '/invite', title: 'invite' },
  { id: 5, link: '/coming-soon', title: 'league' },
]

const CustomNavbar = () => {
  const pathName = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      <div className="relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:opacity-20 before:w-full before:h-2.5 before:bg-[linear-gradient(to_bottom,rgba(0,51,29,00),rgba(0,51,29,1))]">
        <img className="mx-auto" src="/assets/images/navbar-frame.svg" alt="Navbar Frame" />
      </div>
      <div className="relative bg-[#0f0f0f] flex items-end justify-between before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-full before:bg-navbar before:opacity-20 p-3 space-x-8">
        {listMenu.map(item => (
          <Link href={item.link} className={`${item.id === 3 ? 'space-y-2' : 'space-y-1'} flex-1 text-center relative`} key={item.id}>
            {item.id === 3 ? (
              <div className="btn w-fit -mt-12 group bg-transparent">
                <div className="btn-border"></div>
                <div className="btn-primary group-hover:bg-gradient !p-3 shadow-[0_0_16px_rgba(123,255,99,0.35)]">
                  <img className="size-8 min-w-8" src={`/assets/images/icons/icon-${item.title}.svg`} alt="Icon Contribute" />
                </div>
                <div className="btn-border"></div>
              </div>
            ) : (
              <img className="size-7 mx-auto" src={`/assets/images/icons/icon-${item.title}${pathName === item.link ? '-gradient' : ''}.svg`} alt={`Icon ${item.title}`} />
            )}
            <p className={`text-xs font-geist uppercase tracking-[-1px] ${pathName === item.link ? 'text-navbar-gradient' : 'text-green-800/80'}`}>{item.title}</p>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default CustomNavbar