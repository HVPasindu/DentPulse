export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) {
  return (
    <div className="text-left mb-5">
      <label className="block text-gray-600 mb-2">{label}</label>
      <div className="flex items-center border border-cyan-400 rounded-lg p-3 bg-white">
        <span className="mr-2 text-cyan-600">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
}
