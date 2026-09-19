import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import styles from "./UploadPage.module.css";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setDownloadUrl(null);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("user_file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data: { file_id: number | string } = await response.json();

        setDownloadUrl(`http://127.0.0.1:5173/download?file_id=${data.file_id}`);
      } else {
        console.error("Upload error:", response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <h1>Upload your file</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label className={styles.uploadBtn}>
          <span>{file ? "Change File" : "Select File"}</span>
          <input type="file" onChange={handleFileChange} />
        </label>

        {file && (
          <div className={styles.fileInfo}>
            <span className={styles.fileName} title={file.name}>
              📄 {file.name}
            </span>
            <button 
              type="button" 
              className={styles.removeBtn} 
              onClick={handleRemoveFile}
            >
              ✕
            </button>
          </div>
        )}

        <input 
          type="submit" 
          value="Upload" 
          className={styles.submitBtn} 
          disabled={!file} 
        />
      </form>

      {downloadUrl && (
        <div className={styles.successContainer}>
          <p>🎉 Upload Successed!</p>
          <p>Link for download:</p>
          <a href={downloadUrl} target="_blank" rel="noreferrer">
            {downloadUrl}
          </a>
        </div>
      )}
    </div>
  );
}