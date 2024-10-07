import { IconEmpty, IconOpenLink } from '../icons'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useAppSound } from '@/hooks/useAppSound'

interface ItemProps {
  title: string
  link?: string
  textLink?: string
  action?: () => void
  classNames?: {
    wrapper?: ClassValue
    shape?: ClassValue
    icon?: ClassValue
    text?: ClassValue
    link?: ClassValue
  }
}

export default function NoItem({ title, classNames, link, textLink, action }: ItemProps) {
  const { buttonSound } = useAppSound()

  const handleSound = () => {
    buttonSound.play()
  }
  return (
    <div
      className={cn(
        'min-h-[160px] xs:min-h-[200px] 2xs:min-h-[240px] flex items-center justify-center flex-col space-y-2.5 xs:space-y-3 2xs:space-y-4',
        classNames?.wrapper
      )}
    >
      <div
        className={cn(
          'size-16 xs:size-[72px] bg-white/10 flex items-center justify-center [clip-path:_polygon(16px_0%,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0%_16px)]',
          classNames?.shape
        )}
      >
        <IconEmpty className={cn('text-inactive size-8 xs:size-9', classNames?.icon)} />
      </div>
      <p className={cn('text-body text-[15px] xs:text-base tracking-[-1px]', classNames?.text)}>
        {title}
      </p>
      {link && (
        <div onClick={handleSound}>
          <Link href={link || '#'} className={cn('flex items-center space-x-1', classNames?.link)}>
            <p className="font-mona text-gradient uppercase text-[15px] xs:text-base leading-[20px] font-semibold">
              {textLink || 'Buy Now'}
            </p>
            <IconOpenLink className="size-6" gradient />
          </Link>
        </div>
      )}
      {action && (
        <div
          onClick={action}
          className={cn('flex items-center space-x-1 cursor-pointer', classNames?.link)}
        >
          <p className="font-mona text-gradient uppercase text-[15px] xs:text-base leading-[20px] font-semibold">
            {textLink}
          </p>
          <IconOpenLink className="size-6" gradient />
        </div>
      )}
    </div>
  )
}
