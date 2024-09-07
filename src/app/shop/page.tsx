'use client'

import React, { useState } from 'react'
import CustomPage from '../components/custom-page'
import { IconFilter, IconSort } from '../components/icons'
import { useDisclosure } from '@nextui-org/react'
import ShopItem from './components/shop-item'
import FilterSort from '../components/filter-sort'
import { FILTER_TYPE } from '@/constants'
import { useSearchParams } from 'next/navigation'

export default function ShopPage() {
  const searchParams = useSearchParams()

  const type = searchParams.get('type')
  const [activeFilter, setActiveFilter] = useState(type ? FILTER_TYPE.FILTER : FILTER_TYPE.SORT)

  const [filterOptions, setFilterOptions] = useState<{
    sortBy: string
    sortAscending: boolean
    type?: string
  }>({
    sortBy: 'price',
    sortAscending: true,
    type: type || ''
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
      <CustomPage
        classNames={{
          wrapper:
            "before:content-[''] before:absolute before:bottom-[-10%] before:left-[-320px] before:size-[400px] before:rounded-[50%] before:opacity-30 before:bg-gradient before:blur-[50px] before:translate-y-[-50%] before:z-[-1] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
        }}
      >
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

          <ShopItem filterOptions={filterOptions} />
        </div>
      </CustomPage>

      <FilterSort
        isOpen={isOpenFilter}
        onOpen={onOpenFilter}
        onOpenChange={onOpenChangeFilter}
        onClose={onCloseFilter}
        type={activeFilter}
        filterType={filterOptions.type}
        cb={setFilterOptions}
      />
    </>
  )
}
