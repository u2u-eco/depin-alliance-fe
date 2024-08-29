interface ICustomButton {
  title: string
  disable?: boolean
  onAction?: () => void
}
export default function CustomButton({ title, onAction, disable }: ICustomButton) {
  const handleClick = () => {
    onAction && onAction()
  }
  return (
    <div className={`btn ${disable ? 'inactive' : ''}`} onClick={handleClick}>
      <div className="btn-border"></div>
      <div className={`${disable ? 'btn-inactive ' : 'btn-primary'}`}>{title}</div>
      <div className="btn-border"></div>
    </div>
  )
}
