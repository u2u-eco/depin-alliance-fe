'use client'
// import { CustomHeader } from '@/app/components/ui/custom-header'
import { endWorldMap, startWorldMap } from '@/services/world-map'
import useWorldMapStore from '@/stores/worldMapStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Sudoku from '../sudoku'
import ModalReward from '@/app/components/ui/modal-reward'
import { formatNumber } from '@/helper/common'
import { useDisclosure } from '@nextui-org/react'
import { MAP_CONTINENT_IMAGE } from '@/app/map/context/worldmap-context'
import Image from 'next/image'

export default function PlayGame() {
  const router = useRouter()
  const init = useRef<boolean>(false)
  const {
    isOpen: isOpenReward,
    onOpen: onOpenReward,
    onOpenChange: onOpenChangeReward,
    onClose: onCloseReward
  } = useDisclosure()
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { setWorldMapReward, worldMapReward, currentWorldMap } = useWorldMapStore()
  const params = useSearchParams()
  const iframeRef = useRef<any>()
  let type = params.get('type')
  switch (type) {
    case 'SUDOKU':
      type = 'sudoku'
      break
    case 'SOLVE_MATH':
      type = 'solve-math'
      break
    case 'PUZZLE':
      type = 'puzzle'
      break
    case 'MONSTER':
      type = 'monster'
      break
  }
  const [gameData, setGameData] = useState<any>()
  const id = params.get('id')
  const handleEndGame = () => {
    if (id) {
      handleEndMission(id)
    }
  }

  const handleStartMission = async (id: any) => {
    const res = await startWorldMap(id)
    if (res.status) {
      setGameData(res.data)
    }
  }

  const handleEndMission = async (id: any) => {
    const res = await endWorldMap(id)
    if (res.status) {
      setWorldMapReward(res.data)
      onOpenReward()
    }
  }

  useEffect(() => {
    if (!init.current) {
      init.current = true
      window.addEventListener('message', handleMessage)
      if (id) {
        handleStartMission(id)
      }
    }
    if (!id && (type === 'SUDOKU' || type === 'sudoku')) {
      setGameData({
        mission:
          '768..3..453..9...6942.6.81...46..93835..4276..8..3..5.87....1....6..4389..53.1.2.',
        solution:
          '768213594531498276942765813124657938359842761687139452873926145216574389495381627'
      })
    }
  }, [id])

  const handleBack = () => {
    router.back()
  }

  const handleMessage = (event: any) => {
    switch (event.data) {
      case 'WIN':
        handleEndGame()
        break
      case 'BACK':
        router.push(`/map?id=${currentWorldMap?.continent?.code || 'continent_1'}`)
        break
    }
    // console.log('Message received from the child: ' + event.data) // Message received from child
  }

  const handleCloseReward = () => {
    onCloseReward()
    setWorldMapReward(null)
    router.push(`/map?id=${currentWorldMap?.continent?.code || 'continent_1'}`)
  }

  const handleContinue = () => {
    iframeRef.current?.contentWindow.postMessage('CONTINUE', '*')
    onCloseReward()
    router.replace(`/games/play?type=${type}`)
    setWorldMapReward(null)
  }

  // const testContinue = () => {
  //   iframeRef.current.contentWindow.postMessage('CONTINUE', '*')
  //   onClose()
  // }

  useEffect(() => {
    window.addEventListener('message', handleMessage)

    if (!id) {
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage('PASS_MISSION', '*')
      }, 1000)
    }
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div>
      {/* <CustomHeader title="PLAY" /> */}
      {type === 'sudoku' ? (
        <Sudoku data={gameData} handleSuccess={handleEndGame} handleBack={handleBack} />
      ) : (
        <iframe
          ref={iframeRef}
          src={`/games/${type || 'puzzle'}`}
          width={'100%'}
          style={{ position: 'absolute', height: '100%', left: 0, top: 0 }}
        />
      )}
      {/* <CustomModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} onOpenChange={onOpenChange}>
        <CustomButton title="Continue" onAction={testContinue}></CustomButton>
      </CustomModal> */}
      <ModalReward
        isOpen={isOpenReward}
        isGame={true}
        onOpen={onOpenReward}
        onOpenChange={onOpenChangeReward}
        onCloseModal={handleCloseReward}
        onContinue={handleContinue}
        title={worldMapReward?.dailyCombo ? 'daily combo' : 'mission complete'}
        point={formatNumber(
          worldMapReward?.dailyCombo && worldMapReward.reward
            ? worldMapReward.dailyCombo + worldMapReward.reward
            : worldMapReward?.reward || 0,
          0,
          0
        )}
        text={
          worldMapReward?.dailyCombo ? (
            <>
              <p>
                Congratulations. You’ve completed daily combo. This is your reward for hard working.
              </p>
            </>
          ) : (
            <>
              <p>You’ve completed mission.</p>
              <p>This is your reward. Keep going!</p>
            </>
          )
        }
        classNames={{
          wrapper: 'bg-black/80 backdrop-blur-[4px]',
          base: 'bg-transparent backdrop-blur-[unset]'
        }}
      >
        {worldMapReward?.dailyCombo ? (
          <div className="flex items-center justify-center space-x-3 min-[355px]:space-x-4 xs:space-x-5 2xs:space-x-6">
            <div className="relative drop-shadow-green">
              <div
                className={`[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] map-continent_1`}
              >
                <div className="relative space-y-2 xs:space-y-2.5">
                  {currentWorldMap
                    ? MAP_CONTINENT_IMAGE(
                        currentWorldMap?.continent?.code,
                        'size-6 xs:size-7 mx-auto'
                      )
                    : null}
                  <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                    {currentWorldMap?.continent?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative drop-shadow-green">
              <div
                className={`[--shape:_24px] min-[355px]:[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] before:[clip-path:_polygon(calc(50%_-_var(--line)*2)_0,100%_calc(var(--shape)_+_var(--line)),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]`}
              >
                <div className="relative space-y-2 xs:space-y-2.5">
                  <Image
                    src={currentWorldMap?.agency?.image || ''}
                    width={0}
                    alt=""
                    height={0}
                    sizes="100vw"
                    className="size-6 xs:size-7 mx-auto"
                  />
                  {/* {MAP_CONTINENT_IMAGE(currentWorldMap?.continent?.code, 'size-6 xs:size-7 mx-auto')} */}
                  <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                    {currentWorldMap?.agency?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative drop-shadow-green">
              <div
                className={`[--shape:_24px] min-[355px]:[--shape:_28px] w-[86px] min-[355px]:w-[100px] h-[100px] min-[355px]:h-[114px] text-green-100 [clip-path:_polygon(50%_0,100%_var(--shape),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));] bg-green-500 flex items-center justify-center cursor-pointer before:[--line:_8px] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:size-full before:drop-shadow-green before:bg-[#222] before:[clip-path:_polygon(calc(50%_-_var(--line)*2)_0,100%_calc(var(--shape)_+_var(--line)),100%_calc(100%_-_var(--shape)),50%_100%,0_calc(100%_-_var(--shape)),0_var(--shape));]`}
              >
                <div className="relative space-y-2 xs:space-y-2.5">
                  <Image
                    src={currentWorldMap?.tool?.image || ''}
                    width={0}
                    alt=""
                    height={0}
                    sizes="100vw"
                    className="size-6 xs:size-7 mx-auto"
                  />
                  {/* <IconMapAntarctica className="size-6 xs:size-7 mx-auto" /> */}
                  <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                    {currentWorldMap?.tool?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </ModalReward>
    </div>
  )
}
