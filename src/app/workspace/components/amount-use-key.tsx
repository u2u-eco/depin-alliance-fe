import { IconMinusCircle, IconPlusCircle } from '@/app/components/icons'
import { useAppSound } from '@/hooks/useAppSound'
import { useEffect, useState } from 'react'
interface IAmountUseKey {
  maxTotal: number
  updateAmountUseKey: (amount: number) => void
}
export default function AmountUseKey({ maxTotal, updateAmountUseKey }: IAmountUseKey) {
  const [amount, setAmount] = useState<number>(1)
  const { buttonSound } = useAppSound()
  const handleUpdateAmount = (_value: number) => {
    buttonSound.play()
    const currentAmount = amount + _value
    if (currentAmount < 1) {
      setAmount(1)
    } else {
      if (currentAmount > maxTotal) {
        setAmount(maxTotal)
      } else {
        setAmount(currentAmount)
      }
    }
  }

  useEffect(() => {
    if (amount) {
      updateAmountUseKey(amount)
    }
  }, [amount])

  return (
    <div className="space-y-2 xs:space-y-3">
      <div className="flex items-center space-x-2 xs:space-x-4 2xs:space-x-6">
        <div className="cursor-pointer" onClick={() => handleUpdateAmount(-1)}>
          <IconMinusCircle
            className={`size-5 xs:size-6 ${amount === 1 ? 'text-green-800' : 'text-green-500'}`}
          />
        </div>
        <span className="text-green-100 min-w-[22px] text-center text-[15px] xs:text-base 2xs:text-lg font-semibold">
          {amount}
        </span>
        <div className="cursor-pointer" onClick={() => handleUpdateAmount(1)}>
          <IconPlusCircle
            className={`size-5 xs:size-6 ${amount === maxTotal ? 'text-green-800' : 'text-green-500'}`}
          />
        </div>
      </div>
    </div>
  )
}
