type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  message: React.ReactElement | string;
  leftButtonText: string;
  rightButtonText?: string;
  icon?: React.ReactElement;
  loading?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  onDelete,
  message,
  leftButtonText,
  rightButtonText,
  icon,
  loading,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] h-[300px] p-6 border border-black rounded-lg flex flex-col justify-between">
        <button
          onClick={onClose}
          className="self-end text-gray-500 hover:text-gray-800 mb-4">
          &times;
        </button>

        {icon}

        <div className="text-center mb-6 text-lg">{message}</div>

        <div className="flex justify-between mt-4">
          {leftButtonText && (
            <button
              className="bg-gray-400 text-white py-2 px-6 text-lg rounded"
              onClick={onClose}>
              {leftButtonText}
            </button>
          )}
          {rightButtonText && (
            <button
              className="bg-red-500 text-white py-2 px-6 text-lg rounded"
              onClick={() => {
                if (!loading) {
                  onDelete && onDelete();
                }
              }}
              disabled={loading}>
              {loading ? "Loading..." : rightButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
