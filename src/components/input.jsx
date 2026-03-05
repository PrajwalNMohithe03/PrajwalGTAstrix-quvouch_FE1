export const Input = (props) => {
  const { errorMsg, value, onChange, name, label, required } = props;
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded"
      />
      {errorMsg && (
        <div className="text-sm text-red-500 mt-1">{errorMsg || ""}</div>
      )}
    </div>
  );
};
