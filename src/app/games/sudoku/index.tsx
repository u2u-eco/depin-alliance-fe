import { ISPuzzleItem } from '@/interfaces/i.games'
import { useState } from 'react'
import { MainSudoku } from './components/main'
import './styles/_index.scss'
import Time from './components/time'
export default function Sudoku() {
  const [selectedInput, setSelectedInput] = useState<number | null>(null)
  const puzzle = '326....89..489736..983.6...21.7.86....926.57.637.19.2..7.63..4...3.....75.24..9..'
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

  const onHandleChange = (value: string, clearValue?: boolean) => {
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
        onHandleChange={(value: any, clearValue?: boolean) => onHandleChange(value, clearValue)}
      />
      <Time />
    </div>
  )
}
