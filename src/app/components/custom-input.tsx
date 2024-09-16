import { Input } from '@nextui-org/react'
import React from 'react'

interface InputProps {
  isDisabled?: boolean
  label: string
  placeholder: string
  copy?: boolean
  value?: string
  errorMessage?: string
  isInvalid?: boolean
  onValueChange?: (value: string) => void
}

const CustomInput = ({
  isDisabled,
  label,
  value,
  placeholder,
  copy,
  errorMessage,
  isInvalid,
  onValueChange
}: InputProps) => {
  return (
    <div className="relative pt-0.5">
      <Input
        isDisabled={isDisabled}
        label={label}
        defaultValue={value || ''}
        labelPlacement="outside"
        placeholder={placeholder}
        onValueChange={onValueChange}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        classNames={{
          base: 'data-[has-label=true]:mt-6 opacity-100',
          label: '!text-body group-data-[filled-within=true]:!text-body',
          inputWrapper:
            'rounded-none bg-white/5 data-[hover=true]:bg-white/10 group-data-[focus=true]:bg-white/10',
          input: '!text-body group-data-[has-value=true]:!text-body placeholder:!text-inactive'
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
