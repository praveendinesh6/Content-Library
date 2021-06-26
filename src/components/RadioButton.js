function RadioButton({ options, value, onChange }) {
  return (
    <>
      <div className="radio-buttons-conainer flex flex-col pl-3 pt-4 justify-between h-28">
        {options.map((option) => {
          return (
            <label className="cursor-pointer" key={option.value}>
              <input
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
              />
              <span className="pl-2">{option.label}</span>
            </label>
          );
        })}
      </div>
    </>
  );
}
export default RadioButton;
