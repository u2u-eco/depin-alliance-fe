import CustomButton from '@/app/components/button'
import CustomInput from '@/app/components/custom-input'
import { IconImageAdd } from '@/app/components/icons'
import { createLeague, userLeague, validateNameLeague } from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { filetoDataURL, dataURLtoFile, EImageType } from 'image-conversion'
import Image from 'next/image'
interface ICreateLeague {
  onClose: () => void
}
export default function CreateLeague({ onClose }: ICreateLeague) {
  const file = useRef<any>()

  const name = useRef<string>('')
  const router = useRouter()
  const timeoutCheckName = useRef<any>(0)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { setCurrentLeague } = useCommonStore()
  const [isDisableCreate, disableCreate] = useState<boolean>(false)
  const [isExistName, existName] = useState<boolean>(false)
  const onChange = (e: any) => {
    file.current = e.target.files[0]
    filetoDataURL(file.current).then((res) => {
      setImagePreview(res)
      dataURLtoFile(res, EImageType.PNG).then((image) => {
        file.current = image
      })
    })
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
        <div className="relative space-y-2 w-fit mx-auto">
          <div className="size-[90px] mx-auto flex items-center justify-center [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] bg-white/10 overflow-hidden">
            {imagePreview ? (
              <Image
                width={0}
                height={0}
                style={{ width: '100%' }}
                sizes="100vw"
                src={imagePreview}
                alt="preview"
              />
            ) : (
              <IconImageAdd gradient />
            )}
          </div>
          <p className="text-base text-body leading-[20px] tracking-[-1px] text-center">
            Upload Image
          </p>
          <input
            className="absolute top-0 left-0 right-0 w-full h-full m-0 cursor-pointer opacity-0"
            id="files"
            accept="image/*"
            type="file"
            onChange={onChange}
          />
        </div>
        <div className="mb-1">
          <CustomInput
            label="League Name:"
            placeholder="Enter your league's name..."
            onValueChange={onChangeName}
          />
          {isExistName && name.current?.length > 0 ? (
            <p className="!mt-[2px] text-[13px] text-[#E53935] absolute">League name is exist</p>
          ) : null}
        </div>
        {/* <CustomInput
          label="Invite Link:"
          placeholder="https://t.me/DePIN-Alliance"
          isDisabled
          copy
        /> */}
      </div>
      <CustomButton title="CREATE" onAction={create} disable={isDisableCreate} />
    </>
  )
}
