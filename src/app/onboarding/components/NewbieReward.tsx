import { claimRewardNewUser } from '@/app/services/user'
import { useEffect } from 'react'

export default function NewbieReward() {
  const _getRewardNewUser = async () => {
    const rewardPoint = await claimRewardNewUser()
    if (rewardPoint.status) {
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
        <div className="font-geist font-bold text-white text-[40px] text-point">+5,000</div>
        <img className="size-[64px]" src="/assets/images/point.png" alt="Icon Star" />
      </div>
    </div>
  )
}
