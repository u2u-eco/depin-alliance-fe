import { BUTTON_TYPE } from '@/constants'
import Loader from './ui/loader'
import { useAppSound } from '@/hooks/useAppSound'

interface ICustomButton {
  title: string
  disable?: boolean
  isLoading?: boolean
  type?: string
  onAction?: () => void
}
export default function CustomButton({ title, onAction, disable, isLoading, type }: ICustomButton) {
  const { buttonSound } = useAppSound()
  const handleClick = () => {
    buttonSound()
    onAction && onAction()
  }
  const getTypeButton = () => {
    if (disable || isLoading) return 'inactive'
    switch (type) {
      case BUTTON_TYPE.CANCEL:
        return 'error'
      case BUTTON_TYPE.DEFAULT:
        return 'default'
      default:
        return ''
    }
  }

  const getBtnClass = () => {
    if (disable || isLoading) return 'btn-inactive '
    switch (type) {
      case BUTTON_TYPE.CANCEL:
        return 'btn-error'
      case BUTTON_TYPE.DEFAULT:
        return 'btn-default'
      default:
        return 'btn-primary'
    }
  }
  return (
    <div className={`btn ${getTypeButton()}`} onClick={handleClick}>
      <div className="btn-border"></div>
      <div className={`flex justify-center items-center ${getBtnClass()}`}>
        {title}
        {isLoading && (
          <Loader
            classNames={{
              wrapper: 'max-w-[20px] ml-1'
            }}
          />
        )}
      </div>
      <div className="btn-border"></div>
    </div>
  )
}
