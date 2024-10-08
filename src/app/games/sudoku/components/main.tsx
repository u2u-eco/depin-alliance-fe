import { ShapeIcon } from '@/app/components/icons/sharp-sudoku'
import { ISPuzzleItem } from '@/interfaces/i.games'
import { useEffect, useMemo, useRef, useState } from 'react'
interface IMainSudoku {
  puzzle: Array<ISPuzzleItem>
  onSelectInput: (value: number) => void
  onHandleChange: (value: any) => void
}
export const MainSudoku = ({ puzzle, onSelectInput, onHandleChange }: IMainSudoku) => {
  const [selectedRow, setSelectedRow] = useState(0)
  const [selectedCol, setSelectedCol] = useState(0)
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  const [showSelect, setShowSelect] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

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

  const handleClick = (index: number, isPreFilled: boolean) => {
    if (isPreFilled) return
    setShowSelect(true)
    setActiveItem(index)
    onSelectInput(index)
  }

  const handleSelectNumber = (numb: number) => {
    setShowSelect(false)
    onHandleChange(numb)
  }

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
        {listRow.map((item: any, indexRow: number) => (
          <div className={`game-row game-row-${indexRow + 1}`} key={indexRow}>
            {item.map(({ value, isPreFilled }: any, index: number) => {
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
                  className={`game-input ${isPreFilled ? 'prefilled-text' : ''} ${activeItem === indexRow * 9 + index ? 'success' : ''}`}
                  key={indexRow * 9 + index}
                  ref={ref}
                  style={{ height: `${width}px` }}
                  onClick={() => {
                    handleClick(indexRow * 9 + index, isPreFilled)
                  }}
                >
                  <p>{value}</p>
                </div>
              )
            })}
          </div>
        ))}
        <div
          className={`absolute top-0 left-0 right-0 w-full h-full  flex items-center justify-center backdrop-blur-[4px] transition-all ${showSelect ? '' : 'pointer-events-none opacity-0'}`}
        >
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-[4px]"
            onClick={() => setShowSelect(false)}
          ></div>
          <div className="relative grid grid-cols-3 text-title size-[50%] shadow-[0_0_5px_5px_rgba(0,0,0,0.1)]">
            {Array(9)
              .fill(1)
              .map((_, index: number) => (
                <p
                  key={index}
                  className={`flex items-center justify-center bg-white/10 hover:shadow-inner-primary hover:text-green-500 transition-all backdrop-blur-[8px] font-medium text-base xs:text-xl 2xs:text-2xl border-white/10 border-b ${index !== 2 && index !== 5 && index !== 8 ? 'border-r' : ''}`}
                  onClick={() => handleSelectNumber(index + 1)}
                >
                  {index + 1}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="btn-border"></div>
    </div>
  )
}
