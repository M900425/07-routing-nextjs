"use client";

import React from "react";
import Modal from "@/components/Modal/Modal";

interface DefaultModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export default function DefaultModal({
  isOpen,
  onClose,
  children,
}: DefaultModalProps) {
  if (!isOpen) return null;
  return <Modal onClose={onClose!}>{children}</Modal>;
}
