'use client'

import React, { useContext, useState } from 'react'
import { useDisclosure } from '@nextui-org/react'
import ShopItem from './components/shop-item'
import FilterSort from '@/app/components/filter-sort'
import { FILTER_TYPE } from '@/constants'
import { useSearchParams } from 'next/navigation'
import { IconSort, IconFilter } from '@/app/components/icons'
import { WorkspaceContext } from '../../context/workspace-context'
interface IShopPage {
  height: number
}
export default function ShopPage({ height }: IShopPage) {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [activeFilter, setActiveFilter] = useState(type ? FILTER_TYPE.FILTER : FILTER_TYPE.SORT)
  const { typeShopFilter } = useContext(WorkspaceContext)
  const [filterOptions, setFilterOptions] = useState<{
    sortBy: string
    sortAscending: boolean
    type?: string
  }>({
    sortBy: 'price',
    sortAscending: true,
    type: typeShopFilter || type || ''
  })

  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
    onOpenChange: onOpenChangeFilter
  } = useDisclosure()

  const handleFilterSort = (type: string) => {
    setActiveFilter(type)
    onOpenFilter()
  }
  return (
    <>
      <div className="space-y-5 xs:space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-body text-[15px] xs:text-base tracking-[-1px] uppercase">
            {filterOptions.type || 'ALL ITEMS'}
          </p>
          <div className="flex items-center space-x-4 xs:space-x-5 2xs:space-x-6">
            <div className="cursor-pointer" onClick={() => handleFilterSort(FILTER_TYPE.SORT)}>
              <IconSort
                className="size-6 xs:size-[30px] text-green-800"
                gradient={activeFilter === FILTER_TYPE.SORT}
              />
            </div>
            <div className="cursor-pointer" onClick={() => handleFilterSort(FILTER_TYPE.FILTER)}>
              <IconFilter
                className="size-6 xs:size-[30px] text-green-800"
                gradient={activeFilter === FILTER_TYPE.FILTER}
              />
            </div>
          </div>
        </div>

        <ShopItem filterOptions={filterOptions} height={height} />
      </div>
      <FilterSort
        isOpen={isOpenFilter}
        onOpen={onOpenFilter}
        onOpenChange={onOpenChangeFilter}
        onClose={onCloseFilter}
        type={activeFilter}
        filterType={filterOptions.type}
        hideSpecial={true}
        cb={setFilterOptions}
      />
    </>
  )
}
