import { ShapeIcon } from '@/app/components/icons/sharp-sudoku'
import { ISPuzzleItem } from '@/interfaces/i.games'
import { useState } from 'react'
interface IMainSudoku {
  puzzle: Array<ISPuzzleItem>
  onSelectInput: (value: number) => void
  onHandleChange: (e: any) => void
}
export const MainSudoku = ({ puzzle, onSelectInput, onHandleChange }: IMainSudoku) => {
  const [selectedRow, setSelectedRow] = useState(0)
  const [selectedCol, setSelectedCol] = useState(0)

  const onHandleFocus = (isPreFilled: boolean, index: number) => {
    if (!isPreFilled) {
      const currSelectedRow = Math.ceil((index + 1) / 9)
      setSelectedRow(currSelectedRow)
      setSelectedCol(index + 1 - 9 * (currSelectedRow - 1))
    }
  }

  return (
    <div className="game-container">
      {[...Array(4)].map((_, index) => {
        return <ShapeIcon key={index} className={`shape-${index + 1}`} />
      })}
      <div className={`game-wrapper select-row-${selectedRow} select-col-${selectedCol}`}>
        {puzzle.map(({ value, isPreFilled }, index) => {
          return (
            <input
              key={index}
              value={value}
              readOnly={isPreFilled}
              tabIndex={isPreFilled ? -1 : 0}
              className={`game-input ${isPreFilled ? 'prefilled-text' : ''}`}
              type="text"
              // maxLength="1"
              name={`game-input-${index}`}
              onChange={(e) => onHandleChange(e)}
              onFocus={() => {
                onHandleFocus(isPreFilled, index)
                onSelectInput(index)
              }}
              onBlur={() => {
                setSelectedRow(0)
                setSelectedCol(0)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
