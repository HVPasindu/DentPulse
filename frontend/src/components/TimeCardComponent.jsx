

export const TimeCardComponent = ({
  data,
  selectTime,
  setTime,
  disabled,
  aiBusyLevel,
}) => {
  const isSelected = selectTime === data;

  const getAiStyle = () => {
    if (aiBusyLevel === "Low Busy")
      return "border-green-500 bg-green-50 text-green-700";
    if (aiBusyLevel === "High Busy")
      return "border-red-500 bg-red-50 text-red-700";
    return "border-cyan-400 bg-white text-cyan-500";
  };

  const handleClick = () => {
    if (!disabled) {
      setTime(data);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex justify-center items-center
        border-2 rounded-lg p-3
        ${getAiStyle()}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${isSelected ? "ring-2 ring-cyan-600" : ""}
      `}
    >
      <h1>{data}</h1>
    </div>
  );
};

