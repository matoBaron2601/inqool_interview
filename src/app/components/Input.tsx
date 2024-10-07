import removeIcon from "@/images/remove.png";


interface InputProps {
  name?: string;
  filter: string;
  placeholder: string;
  setFilter: (value: string) => void;
  type?: 'text' | 'number';
}

export default function Input({ filter, setFilter, placeholder, name, type = 'text' }: InputProps) {
  const handleReset = () => setFilter("");

  return (
    <div>
      {name && <h3 className="text-center font-semibold mb-4">{name}</h3>}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 pr-10"
        />
        {filter && (
          <button
            onClick={handleReset}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <img src={removeIcon.src} alt="Remove" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
