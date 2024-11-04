import ModalReward from '@/app/components/ui/modal-reward'
import { MAP_CONTINENT_IMAGE } from '@/app/map/context/worldmap-context'
import { formatNumber } from '@/helper/common'
import useWorldMapStore from '@/stores/worldMapStore'
import Image from 'next/image'
interface IClaim {
  isOpen: boolean
  onOpen: () => void
  onOpenChange: () => void
  onCloseModal: () => void
  onContinue?: () => void
}
export default function ClaimGame({
  isOpen,
  onOpen,
  onOpenChange,
  onCloseModal,
  onContinue
}: IClaim) {
  const { worldMapReward, currentWorldMap } = useWorldMapStore()

  return (
    <ModalReward
      isOpen={isOpen}
      isGame={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      onCloseModal={onCloseModal}
      onContinue={onContinue}
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
  )
}
