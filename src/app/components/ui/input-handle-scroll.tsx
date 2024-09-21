import { useRef, useState } from 'react'
import CustomInputSearch from './custom-input-search'
import { IconClose } from '../icons'
interface IInputHandleScroll {
  onValueChange: (text: string) => void
}
export default function InputHandleScroll({ onValueChange }: IInputHandleScroll) {
  const refInput = useRef<any>(null)
  const refBtnClear = useRef<any>(null)
  const [isShowClear, setShowClear] = useState<boolean>(false)
  const handleClickInput = () => {
    const wrap = document.getElementById('jsBody')
    if (wrap && wrap.scrollTop < 150) {
      wrap.scrollTo({
        top: 250
      })
      refInput?.current?.focus()
    } else {
      refInput?.current?.focus()
    }
  }

  const _onValueChange = (text: string) => {
    onValueChange(text)
    if (text?.trim().length > 0) {
      setShowClear(true)
    } else {
      setShowClear(false)
    }
  }

  const handleClear = () => {
    refBtnClear?.current?.click()
  }

  return (
    <div className="h-full w-full relative" onClick={handleClickInput}>
      <CustomInputSearch
        refParent={refInput}
        refBtnClear={refBtnClear}
        pointerNone={true}
        placeholder="Search league..."
        onValueChange={_onValueChange}
      />
      {isShowClear && (
        <div onClick={handleClear}>
          <IconClose className="text-body size-5 absolute top-[50%] right-[12px] translate-y-[-50%]" />
        </div>
      )}
    </div>
  )
}
