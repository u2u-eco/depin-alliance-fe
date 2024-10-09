import { IconClose } from '@/app/components/icons'
import { ShapeIcon } from '@/app/components/icons/sharp-sudoku'
import { ISPuzzleItem } from '@/interfaces/i.games'
import { chunk, forEach } from 'lodash'
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
  const [listDraftById, setListDraftById] = useState<{ [key: number]: Array<number> }>({})
  const [activeItem, setActiveItem] = useState<number>()
  const [selectedId, setSelectedId] = useState<number>(-1)
  const [currentRowCol, setCurrentRowCol] = useState<{ row: number; col: number; group: string }>({
    row: -1,
    col: -1,
    group: '-1-1'
  })

  const [isError, setIsError] = useState<{ [key: number]: boolean }>({})

  const onHandleFocus = (isPreFilled: boolean, index: number) => {
    if (!isPreFilled) {
      const currSelectedRow = Math.ceil((index + 1) / 9)
      setSelectedRow(currSelectedRow)
      setSelectedCol(index + 1 - 9 * (currSelectedRow - 1))
    }
  }

  const listRow = useMemo(() => {
    let listRow = chunk(puzzle, 9)
    forEach(listRow, (row: any, indexRow: number) => {
      forEach(row, (item: any, indexCol: number) => {
        item['group'] = `${Math.floor(indexRow / 3)}${Math.floor(indexCol / 3)}`
      })
    })
    return listRow
  }, [puzzle])

  const handleClick = (
    index: number,
    isPreFilled: boolean,
    row: number,
    col: number,
    group: string
  ) => {
    if (isPreFilled) return
    setShowSelect(true)
    setSelectedId(index)
    setActiveItem(index)
    onSelectInput(index)
    setCurrentRowCol({ row, col, group })
  }

  const handleDraft = () => {
    if (selectedId) {
      setDraftId({
        ...draftId,
        [selectedId]: true
      })
    }
  }

  const checkInput = (numb: number) => {
    let _isError = false
    forEach(listRow, (items: any, indexRow: number) => {
      forEach(items, ({ value, group }: any, indexCol: number) => {
        if (
          indexRow === currentRowCol.row ||
          indexCol === currentRowCol.col ||
          group === currentRowCol.group
        ) {
          if (numb === Number(value)) {
            _isError = true
          }
        }
      })
    })
    setIsError({
      ...isError,
      [selectedId]: _isError
    })
  }

  const handleSelectNumber = (numb: number) => {
    if (draftId[selectedId]) {
      const _listDraft = listDraftById[selectedId] ? listDraftById[selectedId] : []
      if (_listDraft.length > 3) return
      setListDraftById({
        ...listDraftById,
        [selectedId]: [..._listDraft, numb]
      })
      setShowSelect(false)
      return
    }
    setShowSelect(false)
    onHandleChange(numb)
    checkInput(numb)
  }

  const handleResetNumber = () => {
    setShowSelect(false)
    onHandleChange('', true)
    if (draftId[selectedId]) {
      setDraftId({
        ...draftId,
        [selectedId]: false
      })
      setListDraftById({
        ...listDraftById,
        [selectedId]: []
      })
    }
  }

  const renderDraft = (id: number) => {
    const list = [...listDraftById[id], ...Array(4 - listDraftById[id].length).fill(-1)]
    return list?.map((draftValue: number, indexDraft: number) => {
      return draftValue === -1 ? (
        <p key={indexDraft}>&nbsp;</p>
      ) : (
        <p key={indexDraft}>{draftValue}</p>
      )
    })
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
            {item.map(({ value, id, isPreFilled, group }: any, index: number) => {
              return (
                <div
                  className={`game-input ${indexRow === currentRowCol.row || index === currentRowCol.col || group === currentRowCol.group ? 'same' : ''} ${isPreFilled ? 'prefilled-text' : ''} ${isError[id] ? 'error' : ''} ${activeItem === id ? 'selected' : ''} ${draftId[id] ? 'checked' : ''}`}
                  key={id}
                  ref={ref}
                  style={{ height: `${width}px` }}
                  onClick={() => {
                    handleClick(id, isPreFilled, indexRow, index, group)
                  }}
                >
                  {draftId[id] && !isPreFilled && listDraftById[id] ? (
                    <>{renderDraft(id)}</>
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
          <div className="relative grid grid-cols-3 text-title size-[55%] shadow-inner-primary">
            {Array(9)
              .fill(1)
              .map((_, index: number) => (
                <div
                  key={index}
                  className={`flex items-center justify-center bg-black/20 hover:shadow-inner-primary hover:text-green-500 transition-all font-medium text-base xs:text-xl 2xs:text-2xl border-white/20 border-b ${index !== 2 && index !== 5 && index !== 8 ? 'border-r' : ''}`}
                  onClick={() => handleSelectNumber(index + 1)}
                >
                  {index + 1}
                </div>
              ))}
            <div
              className={`flex items-center justify-center bg-black/20 hover:shadow-inner-primary hover:text-green-500 transition-all font-medium text-base xs:text-xl 2xs:text-2xl border-white/20 border-r col-span-2`}
              onClick={handleResetNumber}
            >
              <IconClose className="size-5 xs:size-6 2xs:size-7" />
            </div>
            <div
              className={`flex items-center justify-center bg-black/20 hover:shadow-inner-primary hover:text-green-500 transition-all font-medium text-base xs:text-xl 2xs:text-2xl ${draftId[selectedId] ? 'shadow-inner-primary' : ''}`}
              onClick={handleDraft}
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
