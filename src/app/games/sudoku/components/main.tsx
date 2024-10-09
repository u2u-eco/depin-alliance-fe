import { IconClose } from '@/app/components/icons'
import { ShapeIcon } from '@/app/components/icons/sharp-sudoku'
import { ISPuzzleItem } from '@/interfaces/i.games'
import { useEffect, useMemo, useRef, useState } from 'react'
interface IMainSudoku {
  puzzle: Array<ISPuzzleItem>
  onSelectInput: (value: number) => void
  onHandleChange: (value: any, clearValue?: boolean) => void
}
export const MainSudoku = ({ puzzle, onSelectInput, onHandleChange }: IMainSudoku) => {
  const [selectedRow, setSelectedRow] = useState(0)
  const [selectedCol, setSelectedCol] = useState(0)
  const ref = useRef<any>(null)
  const [width, setWidth] = useState(0)
  const [showSelect, setShowSelect] = useState(false)
  const [draftId, setDraftId] = useState<{ [key: number]: boolean }>({})
  const [activeItem, setActiveItem] = useState<number>()
  const [selectedId, setSelectedId] = useState<number>(-1)

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
    setSelectedId(index)
    setActiveItem(index)
    onSelectInput(index)
  }

  const handleCheck = () => {
    if (selectedId) {
      setDraftId({
        ...draftId,
        [selectedId]: true
      })
    }
  }

  const handleSelectNumber = (numb: number) => {
    setShowSelect(false)
    onHandleChange(numb)
  }

  const handleResetNumber = () => {
    setShowSelect(false)
    onHandleChange('', true)
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
              const _id = indexRow * 9 + index
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
                  className={`game-input ${isPreFilled ? 'prefilled-text' : ''} ${activeItem === _id ? 'selected' : ''} ${draftId[_id] ? 'checked' : ''}`}
                  key={_id}
                  ref={ref}
                  style={{ height: `${width}px` }}
                  onClick={() => {
                    handleClick(_id, isPreFilled)
                  }}
                >
                  {draftId[_id] && !isPreFilled ? (
                    <>
                      <p>{value}</p>
                      {/* <p>2</p>
                      <p>2</p>
                      <p>2</p> */}
                    </>
                  ) : (
                    <p>{value}</p>
                  )}
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
          <div className="relative grid grid-cols-3 text-title size-[55%] shadow-[0_0_5px_5px_rgba(0,0,0,0.1)]">
            {Array(9)
              .fill(1)
              .map((_, index: number) => (
                <div
                  key={index}
                  className={`flex items-center justify-center bg-white/10 hover:shadow-inner-primary hover:text-green-500 transition-all backdrop-blur-[8px] font-medium text-base xs:text-xl 2xs:text-2xl border-white/15 border-b ${index !== 2 && index !== 5 && index !== 8 ? 'border-r' : ''}`}
                  onClick={() => handleSelectNumber(index + 1)}
                >
                  {index + 1}
                </div>
              ))}
            <div
              className={`flex items-center justify-center bg-white/10 hover:shadow-inner-primary hover:text-green-500 transition-all backdrop-blur-[8px] font-medium text-base xs:text-xl 2xs:text-2xl border-white/15 border-r col-span-2`}
              onClick={handleResetNumber}
            >
              <IconClose className="size-5 xs:size-6 2xs:size-7" />
            </div>
            <div
              className={`flex items-center justify-center bg-white/10 hover:shadow-inner-primary hover:text-green-500 transition-all backdrop-blur-[8px] font-medium text-base xs:text-xl 2xs:text-2xl ${draftId[selectedId] ? 'shadow-inner-primary' : ''}`}
              onClick={handleCheck}
            >
              ?
            </div>
          </div>
        </div>
      </div>
      <div className="btn-border"></div>
    </div>
  )
}
