import { formatNumber } from '@/app/helper/common'
import { claimRewardNewUser } from '@/app/services/user'
import { useEffect, useState } from 'react'

export default function NewbieReward() {
  const [reward, setReward] = useState<number>(0)
  const _getRewardNewUser = async () => {
    const rewardPoint = await claimRewardNewUser()
    if (rewardPoint.status) {
      setReward(rewardPoint.data || 0)
    }
  }

  useEffect(() => {
    _getRewardNewUser()
  }, [])

  return (
    <div className="relative mt-28 mb-10">
      <img
        className="mx-auto"
        src="/assets/images/onboarding-scholarship.svg"
        alt="Onboarding Scholarship"
      />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center -space-x-2">
        <div className="font-geist font-bold text-white text-[40px] text-point">{`${reward > 0 ? '+' : ''}${formatNumber(reward, 0, 0)}`}</div>
        <img className="size-[64px]" src="/assets/images/point.png" alt="Icon Star" />
      </div>
    </div>
  )
}
