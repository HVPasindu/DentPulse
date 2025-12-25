export default function PatientRow({ name, age, gender, onView }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-cyan-600 text-white flex items-center justify-center rounded-full font-bold">
          {name[0]}
        </div>

        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">
            {age} years · {gender}
          </p>
        </div>
      </div>

      <button
        onClick={onView}
        className="border border-cyan-600 text-cyan-600 px-4 py-1 rounded-lg hover:bg-cyan-50"
      >
        View
      </button>
    </div>
  );
}
