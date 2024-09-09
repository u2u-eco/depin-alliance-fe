import CustomButton from '@/app/components/button'
import CustomInput from '@/app/components/custom-input'
import { createLeague, userLeague, validateNameLeague } from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
interface ICreateLeague {
  onClose: () => void
}
export default function CreateLeague({ onClose }: ICreateLeague) {
  const file = useRef<any>()
  const name = useRef<string>('')
  const router = useRouter()
  const timeoutCheckName = useRef<any>(0)
  const { setCurrentLeague } = useCommonStore()
  const [isDisableCreate, disableCreate] = useState<boolean>(false)
  const [isExistName, existName] = useState<boolean>(false)
  const onChange = (e: any) => {
    file.current = e.target.files[0]
  }

  const _getUserLeague = async () => {
    const res = await userLeague()
    if (res.status && res.data) {
      setCurrentLeague({ league: res.data })
    }
  }
  const checkName = () => {
    disableCreate(true)
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
    name.current = value
    if (value.length > 0) {
      checkName()
    } else {
      existName(false)
    }
  }
  const create = async () => {
    const formData = new FormData()
    formData.append('name', name.current)
    if (file.current) {
      formData.append('image', file.current)
    }
    const res: any = await createLeague(formData)
    if (res.status && res.data) {
      toast.success('Create successfully')
      _getUserLeague()
      router.push('/league/in-league')
      onClose()
    }
  }
  return (
    <>
      <div className="mt-8 mb-10 space-y-6">
        <div className="mb-1">
          <CustomInput
            label="League Name:"
            placeholder="Enter your league's name..."
            onValueChange={onChangeName}
          />
          {isExistName && (
            <p className="!mt-[2px] text-[13px] text-[#E53935] absolute">League name is exist</p>
          )}
        </div>
        {/* <CustomInput
          label="Invite Link:"
          placeholder="https://t.me/DePIN-Alliance"
          isDisabled
          copy
        /> */}

        <input id="files" accept="image/*" type="file" onChange={onChange} />
      </div>
      <CustomButton title="CREATE" onAction={create} disable={isDisableCreate} />
    </>
  )
}
