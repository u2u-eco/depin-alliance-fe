/* eslint-disable @next/next/no-img-element */

import useCommonStore from '@/stores/commonStore'
interface CardProps {
  shadow?: boolean
}

const Card = ({ shadow }: CardProps) => {
  const deviceInfo = useCommonStore((state) => state.deviceInfo)
  return (
    <div className="card">
      <div className="card__background">
        <img
          src={`/assets/images/configuration-background${shadow ? '-shadow' : ''}.svg`}
          alt="Configuration Background"
        />
      </div>
      <div className="card__list space-y-2">
        {deviceInfo.map((item, index) => (
          <div
            className="flex items-center justify-between text-base leading-[20px] font-geist"
            key={index}
          >
            <div className="uppercase text-green-700">{item.type}</div>
            <div className="flex items-center space-x-1 text-title max-w-[75%] overflow-hidden whitespace-nowrap text-ellipsis">
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card
