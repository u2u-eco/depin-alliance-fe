import CustomInput from '@/app/components/custom-input'
import { validateNameLeague } from '@/services/league'
import { useRef, useState } from 'react'
interface IInputNameLeague {
  disableCreate: (stauts: boolean) => void
  updateName: (value: string) => void
}
export default function InputNameLeague({ disableCreate, updateName }: IInputNameLeague) {
  const name = useRef<string>('')
  const [isExistName, existName] = useState<boolean>(false)
  const [inputName, setInputName] = useState<string>('')
  const timeoutCheckName = useRef<any>(0)
  const checkName = () => {
    disableCreate(true)
    existName(false)
    clearInterval(timeoutCheckName.current)
    const formData = new FormData()
    formData.append('name', name.current)
    timeoutCheckName.current = setTimeout(async () => {
      try {
        const res = await validateNameLeague(formData)
        existName(!res.data)
        disableCreate(!res.data)
      } catch (ex) {
        disableCreate(false)
      }
    }, 400)
  }
  const onChangeName = (value: string) => {
    name.current = value.trim()
    if (value.length > 0) {
      checkName()
    } else {
      existName(false)
    }
    setInputName(name.current)
    updateName(name.current)
  }

  return (
    <div className="mb-1">
      <CustomInput
        label="League Name:"
        placeholder="Enter your league's name..."
        onValueChange={onChangeName}
      />
      {isExistName && inputName?.length > 0 ? (
        <p className="!mt-[2px] text-[13px] text-[#E53935] absolute">League name is invalid</p>
      ) : null}
    </div>
  )
}
