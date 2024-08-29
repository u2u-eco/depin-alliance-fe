import { Input } from '@nextui-org/react'
import React from 'react'

interface InputProps {
  isDisabled?: boolean
  label: string
  placeholder: string
  copy?: boolean
  onValueChange?: (value: string) => void
}

const CustomInput = ({ isDisabled, label, placeholder, copy, onValueChange }: InputProps) => {
  return (
    <div className="relative">
      <Input
        isDisabled={isDisabled}
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        onValueChange={onValueChange}
        classNames={{
          base: 'data-[has-label=true]:mt-10',
          label: 'group-data-[filled-within=true]:text-body',
          inputWrapper:
            'rounded-none bg-white/5 data-[hover=true]:bg-white/10 group-data-[focus=true]:bg-white/10',
          input: 'group-data-[has-value=true]:text-body placeholder:text-inactive'
        }}
      />
      {copy && (
        <div className="absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer">
          <img
            className="size-6 opacity-80"
            src="/assets/images/icons/icon-copy-white.svg"
            alt=""
          />
        </div>
      )}
    </div>
  )
}

export default CustomInput
