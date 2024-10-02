import CustomInput from '@/app/components/custom-input'
import { useState } from 'react'
export interface IEditDeviceName {
  handleInputName: (value: string) => void
  defaultName: string
}
export default function EditDeviceName({ handleInputName, defaultName }: IEditDeviceName) {
  const [name, setName] = useState<string>(defaultName)
  const handleInput = (value: string) => {
    if (value?.trim()?.length > 40) return
    setName(value)
    handleInputName(value)
  }
  return (
    <div className="mb-10">
      <CustomInput
        label="Device Name:"
        value={name}
        placeholder="DEVICE MARS"
        onValueChange={handleInput}
      />
      {name.trim().length === 0 && (
        <p className="text-xs text-error mt-1 font-semibold">Device Name is required!</p>
      )}
    </div>
  )
}
