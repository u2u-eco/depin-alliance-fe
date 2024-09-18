import NoItem from '@/app/components/ui/no-item'
import React from 'react'
import { motion } from 'framer-motion'
import MemberItem from '../../components/member-item'
import CustomModal from '@/app/components/custom-modal'
import { useDisclosure } from '@nextui-org/react'
import { IconPoint } from '@/app/components/icons'

const AllMember = ({ data }: any) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const handleCancel = () => {
    onOpen()
  }
  const handleKick = () => {
    onClose()
  }

  return (
    <>
      {data.length === 0 ? (
        <NoItem title="No member yet" link="/invite" textLink="INVITE NOW" />
      ) : (
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.35 }}
          key="all"
        >
          <div className="flex flex-col space-y-3 2xs:space-y-4">
            {data.map((item: any, index: number) => (
              <MemberItem key={index} item={item} type="member" handleCancel={handleCancel} />
            ))}
          </div>
        </motion.div>
      )}
      <CustomModal title="Kick member" isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
        <div>
          <div className=" text-body text-base tracking-[-1px] text-center">
            <p>
              Are you sure you want to kick this member{' '}
              <span className="text-[#1AF7A8] [word-break:_break-word;]">{`"Hehe"`}</span>?
            </p>
          </div>
          <div className="mt-8 mb-10 flex items-center justify-center space-x-3 xs:space-x-4">
            <div
              className={`p-[1px] size-[110px] min-w-[110px] bg-white [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] flex items-center justify-center`}
            >
              <img
                className="size-full object-cover [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                src="/assets/images/league/league-04@2x.png"
                alt="DePIN Alliance"
              />
            </div>
            <div className="space-y-1.5 xs:space-y-2">
              <p className="text-white font-semibold font-mona text-lg xs:text-xl 2xs:text-2xl !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px]  [word-break:_break-word;]">
                DonCarlo111
              </p>
              <div className="flex items-center space-x-1.5 xs:space-x-2">
                <IconPoint className="size-5 xs:size-6" />
                <span className="text-primary font-semibold">10,000/h</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn default" onClick={onClose}>
              <div className="btn-border"></div>
              <div className="btn-default">Cancel</div>
              <div className="btn-border"></div>
            </div>
            <div className="btn error" onClick={handleKick}>
              <div className="btn-border"></div>
              <div className="btn-error">KICK</div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export default AllMember
