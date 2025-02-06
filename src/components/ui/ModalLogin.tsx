interface ModalLoginProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-lg relative">
        <h2 className="text-xl font-semibold text-center text-gray-500 mb-2">
          Вхід
        </h2>
        <p className="text-center text-gray-500 mb-4">H2O CRM акаунт</p>

        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="water1730"
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="●●●●●●●●"
              className="w-full px-4 text-black py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <label className="flex items-center space-x-2 text-gray-600 text-sm">
            <input type="checkbox" className="w-4 h-4" />
            <span>Запам’ятати мене</span>
          </label>

          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            УВІЙТИ
          </button>
        </div>

        <button
          onClick={() => onClose(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
