import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";

const Modal = ({
  data,
  bgImage,
  buttonCenter,
  buttonText,
  open,
  onClose,
  onClickButton,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black opacity-60" aria-hidden="true" />
      <DialogPanel className="relative bg-white max-w-md mx-auto rounded-lg shadow-xl">
        {bgImage ? (
          <img src={bgImage} className="object-cover w-full h-40" alt="" />
        ) : null}
        <div className="flex items-center flex-col p-6 ">
          <DialogTitle className="text-xl font-bold mb-4 text-center">
            {data?.title}
          </DialogTitle>
          <Description className="text-gray-700 text-justify">
            {data?.content}
          </Description>
          <button
            onClick={onClickButton ? onClickButton : onClose}
            className={`mt-4 bg-[#12B5A5] text-white hover:bg-emerald-800 py-1 px-4 rounded-xl ${
              buttonCenter ? "self-center" : "self-end"
            }`}
          >
            {buttonText}
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default Modal;
