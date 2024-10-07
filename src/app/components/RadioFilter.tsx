interface FilterOption {
    label: string;
    value: string;
  }
  
  interface FilterProps {
    title: string;
    selectedValue: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }
  
  export default function Filter({ title, selectedValue, options, onChange }: FilterProps) {
    return (
      <div className="mb-6">
        <h3 className="text-center font-semibold mb-4">{title}</h3>
        <div className="flex justify-center space-x-4">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }
  