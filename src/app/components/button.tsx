interface ICustomButton {
  title: string
  onAction?: () => void
}
export default function CustomButton({ title, onAction }: ICustomButton) {
  const handleClick = () => {
    onAction && onAction()
  }
  return (
    <div className="btn" onClick={handleClick}>
      <div className="btn-border"></div>
      <div className="btn-primary">{title}</div>
      <div className="btn-border"></div>
    </div>
  )
}
