import { BUTTON_TYPE } from '@/constants'
import Loader from './ui/loader'

interface ICustomButton {
  title: string
  disable?: boolean
  isLoading?: boolean
  type?: string
  onAction?: () => void
}
export default function CustomButton({ title, onAction, disable, isLoading, type }: ICustomButton) {
  const handleClick = () => {
    onAction && onAction()
  }
  return (
    <div
      className={`btn ${disable || isLoading ? 'inactive' : type === BUTTON_TYPE.CANCEL ? 'error' : ''}`}
      onClick={handleClick}
    >
      <div className="btn-border"></div>
      <div
        className={`flex justify-center items-center ${disable || isLoading ? 'btn-inactive ' : type === BUTTON_TYPE.CANCEL ? 'btn-error' : 'btn-primary'}`}
      >
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
