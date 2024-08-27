import React, { ReactNode } from 'react'

interface ItemProps {
  type: string
  image?: string
  icon?: string
  done?: boolean
  rank?: string
  title: string
  children: ReactNode
}

const CustomItem = ({
  type,
  image,
  icon,
  done,
  rank,
  title,
  children
}: ItemProps) => {
  return (
    <div className={`relative before:absolute before:top-0 before:left-0 before:content-[''] before:w-full before:h-full before:[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_20px)] before:opacity-20 before:z-[-1] after:absolute after:content-[''] after:right-0 after:bottom-0 after:size-4 after:border-8 after:border-transparent p-2 flex items-center justify-between ${type === 'mission' ? (done ? 'before:bg-white/5 after:border-b-white/5 after:border-r-white/5' : 'before:bg-item-yellow after:border-b-yellow-900 after:border-r-yellow-900') : type === 'ranking' ? `${rank === '1' ? 'before:bg-item-purple after:border-b-[#BA3AFF] after:border-r-[#BA3AFF]' : rank === '2' ? 'before:bg-item-blue after:border-b-[#00A3FF] after:border-r-[#00A3FF]' : rank === '3' ? 'before:bg-item-orange after:border-b-[#FFA800] after:border-r-[#FFA800]' : 'before:bg-item-green after:border-b-green-900 after:border-r-green-900'} before:opacity-50` : 'before:opacity-20 before:bg-item-green after:border-b-green-900 after:border-r-green-900'}`}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center size-[72px] [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] bg-white/10">
          {image ? <img src={`/assets/images/${image}.png`} srcSet={`/assets/images/${image}.png 1x, /assets/images/${image}@2x.png 2x`} alt="" />
            : <img className="size-9" src={`/assets/images/icons/icon-${icon}-gradient.svg`} alt=""/>}
        </div>
        <div className="space-y-3">
          <div className="text-white font-mona text-lg font-semibold leading-[22px]">{title}</div>
          {children}
        </div>
      </div>
      <div className="mr-3">
        {type === 'skill' ? (
          <div className="size-8 overflow-hidden">
            <img src="/assets/images/icons/icon-double-arrow-up-gradient.svg" alt="" />
          </div>
        ) : type === 'ranking' ? (
          (rank === '1' || rank === '2' || rank === '3') ? <img className="size-[60px]" src={`/assets/images/ranking/rank-0${rank}.png`} alt="Rank" /> : <div className="text-white font-geist text-lg size-[60px] flex items-center justify-center">#{rank}</div>
        ) : (
          <div className="cursor-pointer">
            <img className="size-8" src={`/assets/images/icons/icon-${type === 'mission' ? (done ? 'check-circle-green' : 'open-link-yellow') : type === 'invite' ? 'user-add-gradient' : 'plus-gradient'}.svg`} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomItem
