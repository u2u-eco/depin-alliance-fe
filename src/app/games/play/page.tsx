'use client'
// import { CustomHeader } from '@/app/components/ui/custom-header'
import { endWorldMap, getWorldMap, startWorldMap } from '@/services/world-map'
import useWorldMapStore from '@/stores/worldMapStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Sudoku from '../sudoku'
import { getCurrentTime } from '@/helper/common'
import { useDisclosure } from '@nextui-org/react'
import { useAppSound } from '@/hooks/useAppSound'
import { DEPIN_MAP_CLAIM } from '@/constants'
import ClaimGame from '../components/claim-game'
import useCommonStore from '@/stores/commonStore'

export default function PlayGame() {
  const router = useRouter()
  const path = usePathname()
  const init = useRef<boolean>(false)
  const { userInfo } = useCommonStore()
  const {
    isOpen: isOpenReward,
    onOpen: onOpenReward,
    onOpenChange: onOpenChangeReward,
    onClose: onCloseReward
  } = useDisclosure()

  const id = useRef<any>(null)
  const { specialSound } = useAppSound()

  const { setWorldMapReward, currentWorldMap, setCurrentWorldMap } = useWorldMapStore()

  const params = useSearchParams()
  const _id = params.get('id')

  const iframeRef = useRef<any>()

  let type = params.get('type')
  if (_id) {
    id.current = _id
  }
  switch (type) {
    case 'SUDOKU':
      type = 'sudoku'
      break
    case 'PUZZLE':
      type = '/games/puzzle'
      break
    case 'MONSTER':
      type = '/games/monster'
      break
    case 'SOLVE_MATH':
      type = '/games/solve-math'
      break
    case 'TAP_RAT':
      type = '/games/tap-rat/p'
      break
    default:
      type = '/games/puzzle'
  }

  const [gameData, setGameData] = useState<any>()

  const handleEndGame = () => {
    if (id.current) {
      handleEndMission(id.current)
    }
  }

  const handleStartMission = async (id: any) => {
    const res = await startWorldMap(id)
    if (res.status) {
      setGameData(res.data)
    }
  }

  const updateClaim = (id: any) => {
    if (userInfo?.code) {
      const time = getCurrentTime()
      let dataClaim: any = localStorage.getItem(DEPIN_MAP_CLAIM)
      if (!dataClaim) {
        dataClaim = {
          [time]: {
            [userInfo.code]: {}
          }
        }
      } else {
        dataClaim = JSON.parse(dataClaim)
        if (dataClaim[time]?.[userInfo.code]) {
          dataClaim = {
            [time]: { ...dataClaim[time] }
          }
        } else {
          dataClaim = {
            [time]: {
              [userInfo.code]: {}
            }
          }
        }
      }

      dataClaim[time][userInfo.code][id] = true
      localStorage.setItem(DEPIN_MAP_CLAIM, JSON.stringify(dataClaim))
    }
  }

  const handleEndMission = async (id: any) => {
    try {
      const res = await endWorldMap(id)
      if (res.status) {
        setWorldMapReward(res.data)
        specialSound.play()
        onOpenReward()
      }
    } catch (ex: any) {
      updateClaim(id)
      router.push(`/map?id=${currentWorldMap?.continent?.code || 'continent_1'}`)
      // toast.message(<CustomToast type="error" title={ex?.message || 'Network Error'} />)
    }
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
  useEffect(() => {
    if (!init.current) {
      init.current = true
      window.addEventListener('message', handleMessage)
      if (id.current) {
        handleStartMission(id.current)
      }
    }
    if (!id.current && (type === 'SUDOKU' || type === 'sudoku')) {
      setGameData({
        mission:
          '768..3..453..9...6942.6.81...46..93835..4276..8..3..5.87....1....6..4389..53.1.2.',
        solution:
          '768213594531498276942765813124657938359842761687139452873926145216574389495381627'
      })
    }
  }, [])

  const handleBack = () => {
    router.push(`/map?id=${currentWorldMap?.continent?.code || 'continent_1'}`)
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
    if (!id.current) {
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage('PASS_MISSION', '*')
      }, 1000)
    }
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const _getWorldMap = async () => {
    const res = await getWorldMap()
    if (res.status) {
      setCurrentWorldMap(res.data)
    }
  }

  useEffect(() => {
    _getWorldMap()
  }, [])

  return (
    <div>
      {/* <CustomHeader title="PLAY" /> */}
      {/* <div className=" absolute z-[1000]">
        {path}--
        {params}
      </div> */}
      {type === 'sudoku' ? (
        <Sudoku data={gameData} handleSuccess={handleEndGame} handleBack={handleBack} />
      ) : (
        <iframe
          ref={iframeRef}
          src={`${type}`}
          width={'100%'}
          style={{ position: 'absolute', height: '100%', left: 0, top: 0 }}
        />
      )}
      {/* <CustomModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} onOpenChange={onOpenChange}>
        <CustomButton title="Continue" onAction={testContinue}></CustomButton>
      </CustomModal> */}
      {/* <ModalReward
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
                  <p className="text-title text-center line-clamp-1 font-airnt font-medium text-[9px] min-[355px]:text-[10px] !leading-[14px] tracking-[0.8px] uppercase text-shadow-white">
                    {currentWorldMap?.tool?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </ModalReward> */}
      <ClaimGame
        isOpen={isOpenReward}
        onOpen={onOpenReward}
        onOpenChange={onOpenChangeReward}
        onCloseModal={handleCloseReward}
        onContinue={handleContinue}
      />
    </div>
  )
}
