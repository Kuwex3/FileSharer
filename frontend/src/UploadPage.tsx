import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import styles from "./UploadPage.module.css";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
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
      if (response.ok) console.log("Successful!");
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
              onClick={() => setFile(null)}
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
    </div>
  );
}