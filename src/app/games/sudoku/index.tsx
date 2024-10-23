import { ISPuzzleItem } from '@/interfaces/i.games'
import { useEffect, useState } from 'react'
import { MainSudoku } from './components/main'
import './styles/_index.scss'
// import Time from './components/time'
import CustomButton from '@/app/components/button'
interface ISudoku {
  data: any
  handleSuccess: () => void
  handleBack: () => void
}
export default function Sudoku({ data, handleSuccess, handleBack }: ISudoku) {
  const [selectedInput, setSelectedInput] = useState<number | null>(null)
  const puzzle = data?.mission || ''
  const puzzleArr: any = puzzle.split('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [puzzleObj, setPuzzleObj] = useState<Array<ISPuzzleItem>>([])

  useEffect(() => {
    if (puzzleObj.length === 0 && puzzleArr.length > 0) {
      setPuzzleObj(
        puzzleArr.map((item: any, id: any) => {
          return {
            id,
            value: item !== '.' ? item : '',
            isPreFilled: item !== '.'
          }
        })
      )
    }
  }, [puzzleArr, puzzleObj])

  const checkResult = (result: any) => {
    const listValue = result.map(function (item: any) {
      return item.value || item.value?.length > 0 ? item.value : 0
    })

    const currentResult = listValue.toString().replaceAll(',', '')

    if (currentResult === data.solution) {
      console.log('success')
      setIsSuccess(true)
      handleSuccess()
    }
  }

  const onHandleChange = (value: string, clearValue?: boolean) => {
    const isValueValid = (/^\d+$/.test(value) && value !== '0') || clearValue
    let countEmpty = 0
    let _newData = puzzleObj.map((item) => {
      const _newItem =
        isValueValid && !item.isPreFilled && item.id === selectedInput
          ? {
              id: item.id,
              value,
              isPreFilled: false
            }
          : item

      if (!_newItem.isPreFilled && _newItem.value?.length === 0) {
        ++countEmpty
      }
      return _newItem
    })

    setPuzzleObj(_newData)
    if (countEmpty === 0) {
      checkResult(_newData)
    }
  }

  const handlePlayAgain = () => {
    setIsSuccess(false)
    setPuzzleObj(
      puzzleArr.map((item: any, id: any) => {
        return {
          id,
          value: item !== '.' ? item : '',
          isPreFilled: item !== '.'
        }
      })
    )
  }

  return (
    <div className="sudoku">
      {puzzleObj?.length > 0 ? (
        <>
          <MainSudoku
            puzzle={puzzleObj}
            onSelectInput={(value: number) => setSelectedInput(value)}
            onHandleChange={(value: any, clearValue?: boolean) => onHandleChange(value, clearValue)}
          />
          {!isSuccess && <CustomButton title="BACK" onAction={handleBack} />}
          {isSuccess && <CustomButton title="Play Again" onAction={handlePlayAgain} />}
          {/* <Time /> */}
        </>
      ) : null}
    </div>
  )
}
