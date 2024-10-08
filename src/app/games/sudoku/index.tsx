import { ISPuzzleItem } from '@/interfaces/i.games'
import { useState } from 'react'
import { MainSudoku } from './components/main'
import './styles/index.scss'
export default function Sudoku() {
  const [selectedInput, setSelectedInput] = useState<number | null>(null)
  const puzzle = '5...8..49...5...3..673....115..........2.8..........187....415..3...2...49..5...3'
  const puzzleArr = puzzle.split('')
  const [puzzleObj, setPuzzleObj] = useState<Array<ISPuzzleItem>>(
    puzzleArr.map((item, id) => {
      return {
        id,
        value: item !== '.' ? item : '',
        isPreFilled: item !== '.'
      }
    })
  )

  const onHandleChange = (value: string, clearValue?: string) => {
    const isValueValid = (/^\d+$/.test(value) && value !== '0') || clearValue

    setPuzzleObj((prevItems) =>
      prevItems.map((item) =>
        isValueValid && !item.isPreFilled && item.id === selectedInput
          ? {
              id: item.id,
              value,
              isPreFilled: false
            }
          : item
      )
    )
  }
  return (
    <div className="sudoku">
      <MainSudoku
        puzzle={puzzleObj}
        onSelectInput={(value: number) => setSelectedInput(value)}
        onHandleChange={(e: any) => onHandleChange(e.target.value)}
      />
    </div>
  )
}
