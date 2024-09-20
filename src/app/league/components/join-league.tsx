import CustomButton from '@/app/components/button'
import { IconPoint } from '@/app/components/icons'
import CustomToast from '@/app/components/ui/custom-toast'
import { BUTTON_TYPE } from '@/constants'
import { formatNumber } from '@/helper/common'
import { ILeagueItem } from '@/interfaces/i.league'
import { joinLeague } from '@/services/league'
import { useState } from 'react'
import { toast } from 'sonner'
interface IJoinLeague {
  item: ILeagueItem | null
  onClose: () => void
  joinCb: (code: string) => void
}
export default function JoinLeague({ item, onClose, joinCb }: IJoinLeague) {
  const [loadingButton, setLoadingButton] = useState(false)
  const handleJoin = async () => {
    if (item?.isPendingRequest) return
    if (item?.code) {
      setLoadingButton(true)
      if (loadingButton) return
      const res = await joinLeague(item?.code)
      if (res.status && res.data) {
        toast.success(<CustomToast type="success" title="Request join league successfully" />)
        joinCb(item.code)
        onClose()
      }
      setLoadingButton(false)
    }
  }
  return (
    <>
      <div className=" text-body text-[15px] xs:text-base tracking-[-1px] text-center">
        <p>Are you sure you want to join this League?</p>
      </div>
      <div className="my-8 xs:my-9 2xs:my-10 flex items-center justify-center space-x-4 xs:space-x-5">
        <div className="p-[1px] bg-white [clip-path:_polygon(24px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_24px)] size-[100px] xs:size-[110px] min-w-[100px] xs:min-w-[110px] flex items-center justify-center">
          <img
            className="size-full object-cover [clip-path:_polygon(24px_0%,100%_0,100%_calc(100%_-_24px),calc(100%_-_24px)_100%,0_100%,0_24px)]"
            src={`${item?.avatar}` || '/assets/images/league/league-01@2x.png'}
            alt="DePIN Alliance"
          />
        </div>
        <div className="space-y-1 xs:space-y-1.5 2xs:space-y-2">
          <p className=" text-title font-semibold text-base xs:text-xl 2xs:text-2xl font-mona !leading-[24px] xs:!leading-[28px] 2xs:!leading-[30px] [word-break:_break-word;]">
            {item?.name}
          </p>
          <div className="flex items-center space-x-1.5 xs:space-x-2">
            <IconPoint className="size-5 xs:size-6 2xs:size-7" />
            <span className="text-primary font-semibold xs:text-base 2xs:text-lg">
              {item?.totalMining ? formatNumber(item.totalMining, 0, 2) : 0}/h
            </span>
          </div>
          {/* <p className="text-yellow-600 text-sm xs:text-base 2xs:text-lg !leading-[18px] xs:!leading-[20px] 2xs:!leading-[22px]">
            LV. {item?.level}
          </p> */}
        </div>
      </div>
      {item?.isPendingRequest ? (
        <CustomButton type={BUTTON_TYPE.CANCEL} title="CANCEL JOIN LEAGUE" onAction={() => {}} />
      ) : (
        <CustomButton title="JOIN LEAGUE" disable={item?.isPendingRequest} onAction={handleJoin} />
      )}
    </>
  )
}
