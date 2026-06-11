export default function AuthFormField({ label, type = "text", name, value, onChange, error, isSuccess }) {
  return (
    <div className="w-full flex flex-col mb-4">
      <label htmlFor={name} className={`transition-colors duration-300 ${isSuccess ? "text-green-500 font-medium" :
        error ? "text-red-500 font-medium" : ""
        }`}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={isSuccess}
        className={`border-b-2 px-2 pt-1 transition-colors duration-300 ${isSuccess ? "border-green-500 bg-green-50" :
          error ? "border-red-500" : "border-[#e47995]"
          } ${isSuccess ? "cursor-default" : ""}`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}