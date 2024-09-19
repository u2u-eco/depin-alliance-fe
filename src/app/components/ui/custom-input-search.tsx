import { Input } from '@nextui-org/react'
import React from 'react'
import { IconClose, IconSearch } from '../icons'

interface InputProps {
  placeholder: string
  onValueChange?: (value: string) => void
}

const CustomInputSearch = ({ placeholder, onValueChange }: InputProps) => {
  return (
    <>
      <Input
        isClearable
        classNames={{
          base: "relative data-[focus=true]:drop-shadow-green before:content-[''] before:absolute before:bottom-[2px] before:left-[2px] before:size-2 before:border-[4px] before:border-transparent before:border-l-green-500 before:border-b-green-500 after:content-[''] after:absolute after:bottom-[2px] after:right-[2px] after:size-2 after:border-[4px] after:border-transparent after:border-r-green-500 after:border-b-green-500",
          inputWrapper:
            '[--shape:_12px] rounded-none bg-green-800 p-[1px] [clip-path:_polygon(0_0,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,var(--shape)_100%,0%_calc(100%_-_var(--shape)));] group-data-[focus=true]:bg-green-500 data-[hover=true]:bg-green-500 h-auto',
          innerWrapper:
            '[clip-path:_polygon(0_0,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,var(--shape)_100%,0%_calc(100%_-_var(--shape)));] bg-[var(--black)] py-2 px-3 xs:px-4',
          input:
            'font-geist text-[15px] xs:text-base tracking-[-1px] !leading-[20px] !text-title placeholder:text-body/50 group-data-[has-value=true]:text-title !pl-1.5 xs:!pl-2 !pr-6'
        }}
        placeholder={placeholder}
        onValueChange={onValueChange}
        startContent={
          <IconSearch className="text-green-500 size-6 xs:size-7 2xs:size-8 min-w-6 xs:min-w-7 2xs:min-w-8" />
        }
        endContent={<IconClose className="text-body size-5" />}
      />
    </>
  )
}

export default CustomInputSearch
