
interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error : string
}

const FileInput = ({ label, onChange , error }: FileInputProps) => (
    <div className="flex flex-col gap-2">
      <label className="label"><span className="font-medium">{label}</span></label>
      <input type="file" accept="image/png" className="file-input file-input-bordered w-full" onChange={onChange} />
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
  export default FileInput;
  