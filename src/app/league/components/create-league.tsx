import CustomButton from '@/app/components/button'
import { IconImageAdd } from '@/app/components/icons'
import { createLeague, userLeague, validateNameLeague } from '@/services/league'
import useCommonStore from '@/stores/commonStore'
import { useRef, useState } from 'react'
import { filetoDataURL, dataURLtoFile, EImageType } from 'image-conversion'
import Image from 'next/image'
import InputNameLeague from './input-name-league'
import { MAX_SIZE_UPLOAD } from '@/constants'
import { toast } from 'sonner'
import CustomToast from '@/app/components/ui/custom-toast'

interface ICreateLeague {
  onClose: () => void
  onAction: () => void
}

export default function CreateLeague({ onClose, onAction }: ICreateLeague) {
  const file = useRef<any>()
  const name = useRef<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { setCurrentLeague } = useCommonStore()
  const [isDisableCreate, disableCreate] = useState<boolean>(true)
  const onChange = (e: any) => {
    file.current = e.target.files[0]
    if (file.current.size > MAX_SIZE_UPLOAD) {
      toast.error(<CustomToast type="error" title="File too large" />)
      return
    }
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

  const updateName = (value: string) => {
    name.current = value
  }
  // const checkName = () => {
  //   disableCreate(true)
  //   clearInterval(timeoutCheckName.current)
  //   const formData = new FormData()
  //   formData.append('name', name.current)
  //   timeoutCheckName.current = setTimeout(async () => {
  //     try {
  //       const res = await validateNameLeague(formData)
  //       existName(!res.data)
  //       disableCreate(!res.data)
  //     } catch (ex) {
  //       disableCreate(false)
  //     }
  //   }, 400)
  // }
  // const onChangeName = (value: string) => {
  //   name.current = value
  //   if (value.length > 0) {
  //     checkName()
  //   } else {
  //     existName(false)
  //   }
  // }
  const create = async () => {
    if (isLoading || isDisableCreate || !imagePreview) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append('name', name.current)
    if (file.current) {
      formData.append('image', file.current)
    }
    try {
      const res: any = await createLeague(formData)
      if (res.status && res.data) {
        onAction()
        _getUserLeague()
        onClose()
      }
      setIsLoading(false)
    } catch (ex) {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mt-8 mb-10 space-y-6">
        <div className="relative space-y-2 w-fit mx-auto">
          <div
            className={`size-[85px] xs:size-[90px] mx-auto flex items-center justify-center [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] overflow-hidden p-[1px] ${imagePreview ? 'bg-green-100' : 'bg-white/10'}`}
          >
            {imagePreview ? (
              <div className="[clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] size-full">
                <Image
                  width={0}
                  height={0}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  sizes="100vw"
                  src={imagePreview}
                  alt="preview"
                />
              </div>
            ) : (
              <IconImageAdd className="size-10 xs:size-11" gradient />
            )}
          </div>
          <p className="text-sm xs:text-[15px] 2xs:text-base text-body !leading-[18px] xs:!leading-[20px] tracking-[-1px] text-center">
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
        <InputNameLeague disableCreate={disableCreate} updateName={updateName} />
        {/* <div className="mb-1">
          <CustomInput
            label="League Name:"
            placeholder="Enter your league's name..."
            onValueChange={onChangeName}
          />
          {name.current}
          {isExistName && name.current?.length > 0 ? (
            <p className="!mt-[2px] text-[13px] text-[#E53935] absolute">League name is invalid</p>
          ) : null}
        </div> */}
        {/* <CustomInput
          label="Invite Link:"
          placeholder="https://t.me/DePIN-Alliance"
          isDisabled
          copy
        /> */}
      </div>
      <CustomButton
        title="CREATE"
        onAction={create}
        disable={isLoading || isDisableCreate || !imagePreview}
      />
    </>
  )
}
