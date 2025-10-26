"use client";
import Modal from "../../components/Modal/Modal";
import { ReactNode } from "react";

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
}

export default function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  return <Modal onClose={onClose}>{children}</Modal>;
}
