'use client'

import { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi2'

interface DeleteConfirmProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  itemName?: string
}

export default function DeleteConfirm({ open, onConfirm, onCancel, itemName = 'this item' }: DeleteConfirmProps) {
  const [deleting, setDeleting] = useState(false)

  function handleConfirm() {
    setDeleting(true)
    onConfirm()
    setTimeout(() => setDeleting(false), 500)
  }

  return (
    <Modal show={open} onClose={() => { if (!deleting) onCancel() }} size="sm">
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete {itemName}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleConfirm} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Yes, delete'}
            </Button>
            <Button color="gray" onClick={onCancel} disabled={deleting}>Cancel</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
