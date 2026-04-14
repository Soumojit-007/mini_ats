import { useState } from "react";
interface Props {
  onUpload: (file: File) => void;
  loading: boolean;
}

const Upload = ({ onUpload, loading }: Props) => {
  const [fileName, setFileName] = useState("");

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Only PDF is allowed");
      return;
    }
    setFileName(file.name);
    onUpload(file);
  };

  return (
    <div className="glass">
      <input
        type="file"
        accept="application/pdf"
        title="Upload a PDF file"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      {fileName && <p>Uploaded...</p>}
      {loading && <p>Processing...</p>}
    </div>
  );
};


export default Upload;