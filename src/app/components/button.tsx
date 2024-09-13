import Loader from './ui/loader'

interface ICustomButton {
  title: string
  disable?: boolean
  isLoading?: boolean
  onAction?: () => void
}
export default function CustomButton({ title, onAction, disable, isLoading }: ICustomButton) {
  const handleClick = () => {
    onAction && onAction()
  }
  return (
    <div className={`btn ${disable || isLoading ? 'inactive' : ''}`} onClick={handleClick}>
      <div className="btn-border"></div>
      <div
        className={`flex justify-center items-center ${disable || isLoading ? 'btn-inactive ' : 'btn-primary'}`}
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
