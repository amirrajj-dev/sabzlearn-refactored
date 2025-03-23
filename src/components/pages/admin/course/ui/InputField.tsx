interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error : string
}
const InputField = ({ label, name, type = "text", value, onChange, placeholder , error }: InputFieldProps) => (
    <div className="flex flex-col gap-2">
      <label className="label"><span className="font-medium">{label}</span></label>
      <input type={type} name={name} placeholder={placeholder} className="input w-full" value={value} onChange={onChange} />
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
  export default InputField;  