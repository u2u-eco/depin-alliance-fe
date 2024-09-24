import { Input } from '@nextui-org/react'
import React from 'react'
import { IconPoint } from './icons'

interface InputProps {
  isDisabled?: boolean
  label: string
  placeholder: string
  copy?: boolean
  value?: string
  errorMessage?: string
  isInvalid?: boolean
  amount?: boolean
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
  amount,
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
          inputWrapper: amount
            ? 'rounded-none bg-white/5 data-[hover=true]:bg-white/10 group-data-[focus=true]:bg-white/10 xs:h-11 2xs:h-12 xs:min-h-11 2xs:min-h-12'
            : 'rounded-none bg-white/5 data-[hover=true]:bg-white/10 group-data-[focus=true]:bg-white/10',
          input:
            '!text-body group-data-[has-value=true]:!text-body placeholder:!text-inactive data-[has-start-content=true]:pl-2 data-[has-end-content=true]:pr-2'
        }}
        startContent={amount && <IconPoint className="size-6 xs:size-7 2xs:size-8" />}
        endContent={
          amount && (
            <div className="py-2 text-base cursor-pointer text-gradient font-semibold !leading-[18px] uppercase font-mona backdrop-blur-[4px]">
              MAX
            </div>
          )
        }
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
