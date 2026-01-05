function InputCommonCard({ name, type, value, label,onChange,error }) {

   const isPhone = name === "phone";
  const isDOB = type === "date" && name === "birthDate";

  return (
    <>
      <div className="p-1 flex flex-col gap-3">
        <label className="text-cyan-600 text-sm">{label}</label>
        <input
       type={isPhone ? "tel" : type}
        name={name}
        value={value}
        onChange={onChange}
        max={isDOB ? new Date().toISOString().split("T")[0] : undefined}
        maxLength={isPhone ? 10 : undefined}
        pattern={isPhone ? "[0-9]{10}" : undefined}
        placeholder={isPhone ? "07XXXXXXXX" : label}
        className={`p-3 rounded-xl border outline-none ${
          error ? "border-red-500" : "border-cyan-300"
        }`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
}

export default InputCommonCard;
