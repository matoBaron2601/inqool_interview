type FormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };
  
  export default function FormModal({ isOpen, onClose, children }: FormModalProps) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="bg-white w-[500px] h-auto p-6 border border-black rounded-lg">
          <button
            onClick={onClose}
            className="self-end text-gray-500 hover:text-gray-800 mb-4">
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }
  