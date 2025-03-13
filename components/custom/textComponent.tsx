const TextComponent = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  isTextArea = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
  required?: boolean;
  isTextArea?: boolean;
}) => {
  return (
    <div className="space-y-2 group w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-300 group-hover:text-indigo-400 group-focus-within:text-indigo-400 transition-colors duration-300"
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={6}
          className="block w-full rounded-lg bg-transparent border-gray-700 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-indigo-500 sm:text-sm px-4 py-3 border transition-all duration-300 ease-in-out hover:border-indigo-400 focus:shadow-md text-white placeholder-gray-500"
          placeholder={placeholder}
          style={{ WebkitAppearance: "none" }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full rounded-lg bg-transparent border-gray-700 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-indigo-500 sm:text-sm px-4 py-3 border transition-all duration-300 ease-in-out hover:border-indigo-400 focus:shadow-md text-white placeholder-gray-500"
          placeholder={placeholder}
          style={{ WebkitAppearance: "none" }}
        />
      )}
    </div>
  );
};

export default TextComponent;
