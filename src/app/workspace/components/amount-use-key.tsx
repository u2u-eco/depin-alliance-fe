import { IconMinusCircle, IconPlusCircle } from '@/app/components/icons'
import { useEffect, useState } from 'react'
interface IAmountUseKey {
  maxTotal: number
  updateAmountUseKey: (amount: number) => void
}
export default function AmountUseKey({ maxTotal, updateAmountUseKey }: IAmountUseKey) {
  const [amount, setAmount] = useState<number>(1)

  const handleUpdateAmount = (_value: number) => {
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
    <div className="space-y-3">
      <div className="flex items-center space-x-6">
        <div className="cursor-pointer" onClick={() => handleUpdateAmount(-1)}>
          <IconMinusCircle className="text-green-500 size-6" />
        </div>
        <span className="text-green-100 text-lg font-semibold">{amount}</span>
        <div className="cursor-pointer" onClick={() => handleUpdateAmount(1)}>
          <IconPlusCircle className="text-green-500 size-6" />
        </div>
      </div>
    </div>
  )
}
