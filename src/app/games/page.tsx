'use client'

import CustomPage from '../components/custom-page'
import { CustomHeader } from '../components/ui/custom-header'
import Sudoku from './sudoku'

export default function Game() {
  return (
    <CustomPage
      classNames={{
        wrapper:
          "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
      }}
    >
      <CustomHeader title="games" />

      <Sudoku />
    </CustomPage>
  )
}
