import { FILTER_TYPE } from '@/constants'
import CustomModal from './custom-modal'
import { useState } from 'react'
interface IFilterSort {
  type: string
  isOpen: boolean
  onOpen: () => void
  onOpenChange: () => void
  onClose: () => void
  cb: (filter: any) => void
  filterType?: string
  hideSpecial?: boolean
}
export default function FilterSort({
  type,
  isOpen,
  onOpen,
  onOpenChange,
  cb,
  onClose,
  hideSpecial,
  filterType
}: IFilterSort) {
  const [filterOptions, setFilterOptions] = useState<{
    sortBy: string
    sortAscending: boolean
    type?: string
  }>({
    sortBy: 'price',
    sortAscending: true,
    type: filterType || undefined
  })
  const handleSort = (sortBy: string, sortAscending: boolean, _type: string) => {
    if (type === FILTER_TYPE.FILTER) {
      setFilterOptions({
        ...filterOptions,
        type: _type
      })
    } else {
      setFilterOptions({
        ...filterOptions,
        sortBy,
        sortAscending
      })
    }
  }
  const checkActive = (sortBy: string, sortAscending: boolean, _type: string) => {
    if (type === FILTER_TYPE.SORT) {
      if (filterOptions.sortBy === sortBy && filterOptions.sortAscending === sortAscending) {
        return '!bg-green-500 text-green-500 before:bg-black/80 after:border-t-green-500 after:border-l-green-500 drop-shadow-green'
      }
    } else {
      if (filterOptions.type === _type) {
        return '!bg-green-500 text-green-500 before:bg-black/80 after:border-t-green-500 after:border-l-green-500 drop-shadow-green'
      }
    }
  }

  const handleReset = () => {
    let _filterOption = filterOptions
    if (type === FILTER_TYPE.FILTER) {
      _filterOption = {
        ...filterOptions,
        type: undefined
      }
    } else {
      _filterOption = {
        ...filterOptions,
        sortBy: 'price',
        sortAscending: true
      }
    }
    setFilterOptions(_filterOption)
    handleConfirm(_filterOption)
  }
  const handleConfirm = (_filterOption?: any) => {
    onClose()
    cb(_filterOption || filterOptions)
  }
  return (
    <CustomModal
      title={type === FILTER_TYPE.FILTER ? 'FILTER' : 'SORT BY'}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onOpen={onOpen}
    >
      <div className="relative w-full">
        <div className=" text-body text-base tracking-[-1px] text-center">
          <p>Select option to {type === FILTER_TYPE.FILTER ? 'filter' : 'sort'} item</p>
        </div>

        <div
          className={`grid gap-4 my-8 ${type === FILTER_TYPE.FILTER ? 'grid-cols-2' : 'grid-cols-1'}`}
        >
          <div
            className={`${checkActive('price', false, 'CPU')} before:hidden relative !bg-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:size-3 after:border-[6px] after:border-transparent`}
          >
            <div
              onClick={() => handleSort('price', false, 'CPU')}
              className={`relative bg-white/5 ${checkActive('price', false, 'CPU')} hover:bg-white/10 flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-2px)] before:z-[-1] before:[clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]`}
            >
              {type === FILTER_TYPE.FILTER ? 'CPU' : `High -> Low price`}
            </div>
          </div>
          <div
            className={`${checkActive('price', true, 'GPU')} before:hidden relative !bg-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:size-3 after:border-[6px] after:border-transparent`}
          >
            <div
              onClick={() => handleSort('price', true, 'GPU')}
              className={`relative bg-white/5 ${checkActive('price', true, 'GPU')} hover:bg-white/10 flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-2px)] before:z-[-1] before:[clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]`}
            >
              {type === FILTER_TYPE.FILTER ? 'GPU' : `Low -> High price`}
            </div>
          </div>
          <div
            className={`${checkActive('miningPower', false, 'RAM')} before:hidden relative !bg-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:size-3 after:border-[6px] after:border-transparent`}
          >
            <div
              onClick={() => handleSort('miningPower', false, 'RAM')}
              className={`relative bg-white/5 ${checkActive('miningPower', false, 'RAM')} hover:bg-white/10 flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-2px)] before:z-[-1] before:[clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]`}
            >
              {type === FILTER_TYPE.FILTER ? 'RAM' : `High -> Low profit`}
            </div>
          </div>
          <div
            className={`${checkActive('miningPower', true, 'STORAGE')} before:hidden relative !bg-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:size-3 after:border-[6px] after:border-transparent`}
          >
            <div
              onClick={() => handleSort('miningPower', true, 'STORAGE')}
              className={`relative bg-white/5 ${checkActive('miningPower', true, 'STORAGE')} hover:bg-white/10 flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-2px)] before:z-[-1] before:[clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]`}
            >
              {type === FILTER_TYPE.FILTER ? 'STORAGE' : `Low -> High profit`}
            </div>
          </div>
          {type === FILTER_TYPE.FILTER && !hideSpecial ? (
            <div
              className={`${checkActive('miningPower', true, 'SPECIAL')} before:hidden relative !bg-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:size-3 after:border-[6px] after:border-transparent`}
            >
              <div
                onClick={() => handleSort('miningPower', true, 'SPECIAL')}
                className={`relative bg-white/5 ${checkActive('miningPower', true, 'SPECIAL')} hover:bg-white/10 flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5 before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-2px)] before:z-[-1] before:[clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]`}
              >
                SPECIAL
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center space-x-4">
          <div className={`btn default`} onClick={handleReset}>
            <div className="btn-border"></div>
            <div className={`btn btn-default`}>Reset</div>
            <div className="btn-border"></div>
          </div>
          <div
            className="btn"
            onClick={() => {
              handleConfirm()
            }}
          >
            <div className="btn-border"></div>
            <div className="btn-primary">Confirm</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}
