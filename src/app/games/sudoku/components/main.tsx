import { ShapeIcon } from '@/app/components/icons/sharp-sudoku'
import { ISPuzzleItem } from '@/interfaces/i.games'
import { useEffect, useMemo, useRef, useState } from 'react'
interface IMainSudoku {
  puzzle: Array<ISPuzzleItem>
  onSelectInput: (value: number) => void
  onHandleChange: (e: any) => void
}
export const MainSudoku = ({ puzzle, onSelectInput, onHandleChange }: IMainSudoku) => {
  const [selectedRow, setSelectedRow] = useState(0)
  const [selectedCol, setSelectedCol] = useState(0)
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  const onHandleFocus = (isPreFilled: boolean, index: number) => {
    if (!isPreFilled) {
      const currSelectedRow = Math.ceil((index + 1) / 9)
      setSelectedRow(currSelectedRow)
      setSelectedCol(index + 1 - 9 * (currSelectedRow - 1))
    }
  }

  const listRow = useMemo(() => {
    const list: any = []
    let count = 0
    let row: any = []
    puzzle.forEach((item: any, index: number) => {
      if (count < 9) {
        ++count
        row.push(item)
        if (count === 9) {
          list.push(row)
          row = []
          count = 0
        }
      }
    })
    return list
  }, [puzzle])

  const handleClick = () => {}

  useEffect(() => {
    setWidth(ref?.current?.offsetWidth)
    const getwidth = () => {
      setWidth(ref?.current?.offsetWidth)
    }
    window.addEventListener('resize', getwidth)
    return () => window.removeEventListener('resize', getwidth)
  }, [])

  return (
    <div className="game-container btn">
      <div className="btn-border"></div>
      <div
        className={`btn-primary game-wrapper select-row-${selectedRow} select-col-${selectedCol}`}
      >
        {listRow.map((item: any, index: number) => (
          <div className={`game-row game-row-${index + 1}`} key={index}>
            {item.map(({ value, isPreFilled }, index: number) => {
              return (
                // <input
                //   key={index}
                //   value={value}
                //   readOnly={isPreFilled}
                //   tabIndex={isPreFilled ? -1 : 0}
                //   className={`game-input ${isPreFilled ? 'prefilled-text' : ''}`}
                //   type="text"
                //   // maxLength="1"
                //   name={`game-input-${index}`}
                //   onChange={(e) => onHandleChange(e)}
                //   onFocus={() => {
                //     onHandleFocus(isPreFilled, index)
                //     onSelectInput(index)
                //   }}
                //   onBlur={() => {
                //     setSelectedRow(0)
                //     setSelectedCol(0)
                //   }}
                // />
                <div
                  className={`game-input ${isPreFilled ? 'prefilled-text' : ''}`}
                  key={index}
                  ref={ref}
                  style={{ height: `${width}px` }}
                  // onClick={() => onHandleFocus(isPreFilled, index)}
                >
                  <p>{value}</p>
                </div>
              )
            })}
          </div>
        ))}
        <div className="absolute top-0 left-0 right-0 w-full h-full bg-black/80 flex items-center justify-center backdrop-blur-[4px] pointer-events-none opacity-0">
          <div className="grid grid-cols-3 text-title size-[50%]">
            <p className="flex items-center justify-center bg-white/30">1</p>
            <p className="flex items-center justify-center bg-white/30">2</p>
            <p className="flex items-center justify-center bg-white/30">3</p>
            <p className="flex items-center justify-center bg-white/30">4</p>
            <p className="flex items-center justify-center bg-white/30">5</p>
            <p className="flex items-center justify-center bg-white/30">6</p>
            <p className="flex items-center justify-center bg-white/30">7</p>
            <p className="flex items-center justify-center bg-white/30">8</p>
            <p className="flex items-center justify-center bg-white/30">9</p>
          </div>
        </div>
      </div>
      <div className="btn-border"></div>
    </div>
  )
}
