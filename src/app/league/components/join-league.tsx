import CustomButton from '@/app/components/button'
import { formatNumber } from '@/helper/common'
import { ILeagueItem } from '@/interfaces/i.league'
import { joinLeague } from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import Image from 'next/image'
interface IJoinLeague {
  item: ILeagueItem | null
  onClose: () => void
  joinCb: () => void
}
export default function JoinLeague({ item, onClose, joinCb }: IJoinLeague) {
  const { userConfig } = useCommonStore()
  const handleJoin = async () => {
    if (item?.code) {
      const res = await joinLeague(item?.code)
      if (res.status && res.data) {
        joinCb()
        onClose()
      }
    }
  }
  return (
    <>
      <div className=" text-body text-base tracking-[-1px] text-center">
        <p>Are you sure you want to join this League?</p>
      </div>
      <div className="my-10 flex items-center justify-center space-x-5">
        <div className="p-[1px] bg-white [clip-path:_polygon(24px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_24px)] size-[110px] flex items-center justify-center">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full [clip-path:_polygon(24px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_24px)]"
            src={
              `${userConfig?.urlImage}${item?.avatar}` || '/assets/images/league/league-01@2x.png'
            }
            // srcSet="/assets/images/league/league-01.png 1x. /assets/images/league/league-01@2x.png 2x"
            alt=""
          />
        </div>
        <div className="space-y-3">
          <p className=" text-title font-semibold text-2xl font-mona leading-[30px]">
            {item?.name}
          </p>
          <div className="flex items-center space-x-2">
            <img
              className="size-7"
              src="/assets/images/point.png"
              srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
              alt="Point"
            />
            <span className="text-primary font-semibold text-lg">
              {item?.totalMining ? formatNumber(item.totalMining, 0, 0) : 0}/h
            </span>
          </div>
        </div>
      </div>
      <CustomButton title="JOIN LEAGUE" onAction={handleJoin} />
    </>
  )
}
