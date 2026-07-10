'use client'

import { Modal, ModalHeader, ModalBody } from 'flowbite-react'

interface AdminModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function AdminModal({ open, onClose, title, children, size = 'md' }: AdminModalProps) {
  return (
    <Modal show={open} onClose={onClose} size={size}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  )
}
