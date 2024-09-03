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
}
export default function FilterSort({
  type,
  isOpen,
  onOpen,
  onOpenChange,
  cb,
  onClose
}: IFilterSort) {
  const [filterOptions, setFilterOptions] = useState<{
    sortBy: string
    sortAscending: boolean
    type?: string
  }>({
    sortBy: 'price',
    sortAscending: true
  })
  const handleSort = (sortBy: string, sortAscending: boolean, _type: string) => {
    if (type === FILTER_TYPE.FILTER) {
      setFilterOptions({
        ...filterOptions,
        type: _type
      })
    } else {
      setFilterOptions({
        sortBy,
        sortAscending
      })
    }
  }
  const checkActive = (sortBy: string, sortAscending: boolean, _type: string) => {
    if (type === FILTER_TYPE.SORT) {
      if (filterOptions.sortBy === sortBy && filterOptions.sortAscending === sortAscending) {
        return '!bg-white/10'
      }
    } else {
      if (filterOptions.type === _type) {
        return '!bg-white/10'
      }
    }
  }

  const handleReset = () => {
    let _filterOption = filterOptions
    if (type === FILTER_TYPE.FILTER) {
      _filterOption = {
        ...filterOptions,
        type: ''
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
          <p>Select option to {FILTER_TYPE.FILTER ? 'filter' : 'sort'} item</p>
        </div>

        <div
          className={`grid gap-4 my-8 ${type === FILTER_TYPE.FILTER ? 'grid-cols-2' : 'grid-cols-1'}`}
        >
          <div
            onClick={() => handleSort('price', false, 'CPU')}
            className={`bg-white/5 ${checkActive('price', false, 'CPU')} hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5`}
          >
            {type === FILTER_TYPE.FILTER ? 'CPU' : `High -> Low price`}
          </div>
          <div
            onClick={() => handleSort('price', true, 'GPU')}
            className={`bg-white/5 ${checkActive('price', true, 'GPU')} hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5`}
          >
            {type === FILTER_TYPE.FILTER ? 'GPU' : `Low -> High price`}
          </div>
          <div
            onClick={() => handleSort('miningPower', false, 'RAM')}
            className={`bg-white/5 ${checkActive('miningPower', false, 'RAM')} hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5`}
          >
            {type === FILTER_TYPE.FILTER ? 'RAM' : `High -> Low profit`}
          </div>
          {type === FILTER_TYPE.SORT ? (
            <div
              onClick={() => handleSort('miningPower', true, '')}
              className={`bg-white/5 ${checkActive('miningPower', true, 'SSD')} hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5`}
            >
              {type === FILTER_TYPE.FILTER ? '' : `Low -> High profit`}
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
