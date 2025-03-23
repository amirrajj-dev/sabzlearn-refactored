import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);

interface EditorInputProps {
  label: string;
  data: string;
  onChange: (event: any, editor:  any) => void;
  error?: string;
}

const EditorInput = ({ label, data, onChange , error }: EditorInputProps) => (
  <div className="flex flex-col gap-2">
    <label className="label"><span className="font-medium">{label}</span></label>
    <CKEditor editor={ClassicEditor} data={data} onChange={onChange} config={{ language: "fa" }} className="bg-base-300"  {...({} as any) } />
    <p className="text-red-500 text-sm">{error}</p>
  </div>
);
export default EditorInput;