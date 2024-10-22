'use client'

import { useRouter } from 'next/navigation'
import CustomButton from '../components/button'
import CustomPage from '../components/custom-page'
import { CustomHeader } from '../components/ui/custom-header'

export default function Game() {
  const router = useRouter()
  const handleOpenGame = (link: string) => {
    router.push(link)
  }
  return (
    <CustomPage
      classNames={{
        wrapper:
          "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-green after:z-[-2]"
      }}
    >
      <CustomHeader title="Game" />
      <div className="py-5 flex flex-col gap-4">
        <CustomButton
          title="Puzzle"
          onAction={() => {
            handleOpenGame('games/play?type=puzzle')
          }}
        />
        <CustomButton
          title="Monster"
          onAction={() => {
            handleOpenGame('games/play?type=monster')
          }}
        />
        <CustomButton
          title="Solve Math"
          onAction={() => {
            handleOpenGame('games/play?type=solve-math')
          }}
        />
        <CustomButton
          title="Sudoku"
          onAction={() => {
            handleOpenGame('games/play?type=sudoku')
          }}
        />
      </div>
    </CustomPage>
  )
}
