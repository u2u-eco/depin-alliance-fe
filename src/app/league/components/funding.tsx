import CustomButton from '@/app/components/button'
import CustomInput from '@/app/components/custom-input'
import { IconFund, IconPoint } from '@/app/components/icons'
import CustomToast from '@/app/components/ui/custom-toast'
import { formatNumber, kFormatter } from '@/helper/common'
import { funding } from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'
interface IFundingModal {
  closeModal: () => void
  cb: () => void
}
const FundingModal = ({ closeModal, cb }: IFundingModal) => {
  const { userInfo, getUserInfo, currentLeague } = useCommonStore()
  const [amount, setAmount] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleUpdateAmount = (amount: string) => {
    const re = /^[0-9\b]+$/

    // if value is not blank, then test the regex

    if (amount === '' || re.test(amount)) {
      setAmount(amount)
    }
  }

  const handleMax = () => {
    const _total = formatNumber(userInfo?.point || 0, 0, 0).replaceAll(',', '')
    setAmount(userInfo?.point ? _total : '')
  }

  const handleConfirm = async () => {
    if (isLoading) return
    setLoading(true)
    const res = await funding(amount)
    if (res.status) {
      toast.success(<CustomToast type="success" title="Funding successfully" />)
      getUserInfo()
      cb && cb()
      closeModal()
    }
    setLoading(false)
  }

  const isInvalid = useMemo(() => {
    if (amount === '' || !userInfo?.point) return false
    return Number(amount) > userInfo?.point ? true : false
  }, [amount, userInfo?.point])

  return (
    <div>
      <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
        <p>Fund your points to League to unlock special features</p>
      </div>
      <div className="space-y-4 xs:space-y-5 2xs:space-y-6 flex items-center justify-center flex-col text-center my-6 xs:my-8 2xs:my-10">
        <div className="relative drop-shadow-green before:content-[''] before:absolute before:top-[6px] xs:before:top-[7px] 2xs:before:top-[8px] before:left-[6px] xs:before:left-[7px] 2xs:before:left-[8px] before:border-transparent before:size-2.5 xs:before:size-3 2xs:before:size-[14px] before:border-[5px] xs:before:border-[6px] 2xs:before:border-[7px] before:border-t-green-500 before:border-l-green-500 before:z-[-1] after:content-[''] after:absolute after:bottom-0 after:right-0 after:border-transparent after:size-4 xs:after:size-[18px] 2xs:after:size-5 after:border-[8px] xs:after:border-[9px] 2xs:after:border-[10px] after:border-b-green-500 after:border-r-green-500 after:z-[-1]">
          <div className="[--shape:_22px] xs:[--shape:_26px] 2xs:[--shape:_30px] p-[1px] size-[100px] xs:size-[115px] 2xs:size-[130px] bg-gradient [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))]">
            <div className="[clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0%_var(--shape))] bg-[linear-gradient(to_bottom,#000,#00331d)] size-full flex items-center justify-center">
              <IconFund className="size-12 xs:size-14 2xs:size-16" gradient />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="uppercase text-title leading-[18px] tracking-[-1px]">LEAGUE’S FUND</p>
          <div className="flex items-center space-x-1.5 xs:space-x-2">
            <IconPoint className="size-6 xs:size-7 2xs:size-8" />
            <p className="text-point text-xl xs:text-2xl 2xs:text-[28px] font-bold !leading-[26px] xs:!leading-[32px] 2xs:!leading-[38px] tracking-[-1px]">
              {kFormatter(currentLeague?.point || 0, 0, 2)}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <CustomInput
          label="Amount:"
          placeholder="Enter amount..."
          amount
          value={amount}
          isInvalid={isInvalid}
          errorMessage="Your balance not enough"
          onValueChange={handleUpdateAmount}
          onMax={handleMax}
        />
        <div className="flex items-center space-x-1">
          <p className="text-inactive leading-[18px] tracking-[-1px]">Balance:</p>
          <div className="flex items-center space-x-1 xs:space-x-1.5 2xs:space-x-2">
            <IconPoint className="size-4 xs:size-5 2xs:size-6" />
            <p className="text-green-500 font-semibold">
              {formatNumber(userInfo?.point || 0, 0, 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 xs:mt-7 2xs:mt-8">
        <CustomButton title="Confirm" isLoading={isLoading} onAction={handleConfirm} />
      </div>
    </div>
  )
}

export default FundingModal
