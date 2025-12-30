function InputCommonCard(props) {
  return (
    <>  
        <div className="p-1 flex flex-col gap-3">
          <label className="text-cyan-600 text-sm">{props.name}</label>
          <input type={props.type} className="border-2  border-cyan-500 rounded-lg p-1.5 hover:border-gray-500 hover:border-2" placeholder={props.name}/>
        </div>
    </>
  );
}

export default InputCommonCard;
