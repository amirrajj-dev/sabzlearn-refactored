const TextAreaField = ({ label, name, value, onChange, placeholder , error }: any) => (
    <div className="flex flex-col gap-2">
      <label className="label"><span className="font-medium">{label}</span></label>
      <textarea name={name} className="textarea w-full" placeholder={placeholder} value={value} onChange={onChange} />
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
  export default TextAreaField;
  