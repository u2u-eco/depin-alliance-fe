import { FILTER_TYPE } from '@/constants'
import CustomModal from './custom-modal'
import { useState } from 'react'
interface IFilterSort {
  type: string
  isOpen: boolean
  onOpen: () => void
  onOpenChange: () => void
  cb: (filter: any) => void
}
export default function FilterSort({ type, isOpen, onOpen, onOpenChange, cb }: IFilterSort) {
  const [filterOptions, setFilterOptions] = useState<{ sortBy: string; sortAscending: boolean }>({
    sortBy: 'price',
    sortAscending: true
  })
  const handleSort = (sortBy: string, sortAscending: boolean, type: string) => {
    if (type === FILTER_TYPE.FILTER) {
    } else {
      setFilterOptions({
        sortBy,
        sortAscending
      })
    }
  }
  const handleConfirm = () => {
    cb(filterOptions)
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
            className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5"
          >
            {type === FILTER_TYPE.FILTER ? 'CPU' : `High -> Low price`}
          </div>
          <div
            onClick={() => handleSort('price', true, 'GPU')}
            className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5"
          >
            {type === FILTER_TYPE.FILTER ? 'GPU' : `Low -> High price`}
          </div>
          <div
            onClick={() => handleSort('miningPower', false, 'RAM')}
            className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5"
          >
            {type === FILTER_TYPE.FILTER ? 'RAM' : `High -> Low profit`}
          </div>
          <div
            onClick={() => handleSort('miningPower', true, 'SSD')}
            className="bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-base leading-[20px] tracking-[-1px] text-body cursor-pointer [clip-path:_polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] py-[18px] px-5"
          >
            {type === FILTER_TYPE.FILTER ? 'SSD' : `Low -> High profit`}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`btn default`}>
            <div className="btn-border"></div>
            <div className={`btn btn-default`}>Reset</div>
            <div className="btn-border"></div>
          </div>
          <div className="btn" onClick={handleConfirm}>
            <div className="btn-border"></div>
            <div className="btn-primary">Confirm</div>
            <div className="btn-border"></div>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}
