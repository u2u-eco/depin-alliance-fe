import Image from 'next/image'
interface IImageDevice {
  className: string
  image: string | null
  type: string
}
export default function ImageDevice({ className, image, type }: IImageDevice) {
  return (
    <Image
      width={0}
      height={0}
      sizes="100vw"
      className={className}
      src={
        image && image?.length > 0
          ? image
          : `/assets/images/upgrade/upgrade-${type?.toLocaleLowerCase()}@2x.png`
      }
      alt=""
    />
  )
}
