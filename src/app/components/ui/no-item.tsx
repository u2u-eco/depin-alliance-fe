import { IconEmpty } from "../icons"
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

interface ItemProps {
  title: string,
  classNames?: {
    wrapper?: ClassValue,
    shape?: ClassValue,
    icon?: ClassValue,
    text?: ClassValue,
  }
}

export default function NoItem({ title, classNames }: ItemProps) {
  return (
    <div className={cn('min-h-[200px] xs:min-h-[220px] 2xs:min-h-[240px] flex items-center justify-center flex-col space-y-2.5 xs:space-y-3 2xs:space-y-4', classNames?.wrapper)}>
      <div className={cn('size-16 xs:size-[72px] bg-white/10 flex items-center justify-center [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0%_16px)]', classNames?.shape)}>
        <IconEmpty className={cn('text-inactive size-8 xs:size-9', classNames?.icon)} />
      </div>
      <p className={cn('text-body text-[15px] xs:text-base tracking-[-1px]', classNames?.text)}>{title}</p>
    </div>
  )
}
