import CustomButton from '@/app/components/button'
import CustomInput from '@/app/components/custom-input'
import { createLeague } from '@/services/league'
import { useRef } from 'react'
import { toast } from 'sonner'
interface ICreateLeague {
  onClose: () => void
  refreshList: () => void
}
export default function CreateLeague({ onClose, refreshList }: ICreateLeague) {
  const file = useRef<any>()
  const name = useRef<string>('')
  const onChange = (e: any) => {
    file.current = e.target.files[0]
  }
  const onChangeName = (value: string) => {
    name.current = value
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
      refreshList()
      onClose()
    } else {
      if (res.message) {
        toast.error(res.message)
      }
    }
  }
  return (
    <>
      <div className="mt-14 mb-10 space-y-6">
        <CustomInput
          label="League Name:"
          placeholder="Enter your league's name..."
          onValueChange={onChangeName}
        />
        {/* <CustomInput
          label="Invite Link:"
          placeholder="https://t.me/DePIN-Alliance"
          isDisabled
          copy
        /> */}
        <input type="file" onChange={onChange} />
      </div>
      <CustomButton title="CREATE" onAction={create} />
    </>
  )
}
