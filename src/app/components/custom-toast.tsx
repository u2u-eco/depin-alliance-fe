import React from 'react'

interface ToastProps {
  type: string
  content: string
}

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
}

const CustomToast = ({type, content}: ToastProps) => {
  return (
    <div className="flex items-center justify-center space-x-3 w-full">
      <img className="size-6" src={`/assets/images/icons/icon-${type === TOAST_TYPE.SUCCESS ? 'check-circle-green' : 'error-hexagon-red'}.svg`} alt="" />
      <p className="font-geist text-base text-title leading-[20px]">{content}</p>
    </div>
  )
}

export default CustomToast