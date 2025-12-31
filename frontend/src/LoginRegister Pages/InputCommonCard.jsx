// const InputCommonCard = ({ name, type, value, onChange }) => {
//   return (
//     <div className="p-1 flex flex-col gap-3">
//       <label className="text-cyan-600 text-sm">{name}</label>
//       <input 
//         type={type} 
//         name={name}
//         value={value}
//         onChange={onChange} 
//         className="border-2 border-cyan-500 rounded-lg p-1.5 hover:border-gray-500" 
//         placeholder={name} 
//       />
//     </div>
//   );
// };

// export default InputCommonCard;


const InputCommonCard = ({ name, type, value, onChange }) => {
  return (
    <div className="p-1 flex flex-col gap-3">
      <label className="text-cyan-600 text-sm">{name}</label>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange} 
        className="border-2 border-cyan-500 rounded-lg p-1.5 hover:border-gray-500" 
        placeholder={name} 
      />
    </div>
  );
};

export default InputCommonCard;
