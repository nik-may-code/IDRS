const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000df] bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-xl w-full max-w-md p-6 shadow-lg relative">
        <h2 className="text-lg font-bold mb-4 tracking-wide">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-zinc-500 hover:text-zinc-700 text-xl font-bold cursor-pointer"
        >
          ×
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
