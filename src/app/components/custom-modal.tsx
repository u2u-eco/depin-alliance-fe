import React from 'react'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'

const CustomModal = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <div>
          <div className="font-airnt font-bold text-xl tracking-[1px] text-white text-center"></div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal