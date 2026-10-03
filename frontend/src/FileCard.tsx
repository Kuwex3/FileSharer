import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./FileCard.module.css";
import folderImage from ".././src/assets/folder.webp";

interface FileData {
  id: number;
  file_name: string;
  size: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default function FileCard() {
  const [searchParams] = useSearchParams();
  const fileId = searchParams.get("file_id");

  const [file, setFile] = useState<FileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileId) {
      setLoading(false);
      return;
    }

    const fetchFile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/getInfo?file_id=${fileId}`);

        if (!response.ok) {
          throw new Error("File not found");
        }

        const data: FileData = await response.json();
        setFile(data);
      } catch (err: any) {
        setError(err.message || "Error with loading");
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId]);

  const handleDownload = () => {
    if (!file) return;
    const downloadUrl = `${API_BASE_URL}/api/download?file_id=${file.id}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", file.file_name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) {
    return (
      <div className={styles.cardDiv}>
        <h1>Loading content...</h1>
      </div>
    );
  }

  if (error || !fileId || !file) {
    return (
      <div className={styles.cardDiv}>
        <h1>{error || "Param file_id not found"}</h1>
      </div>
    );
  }

  return (
    <div className={styles.cardDiv}>
      <h1>{file.file_name}</h1>
      <h2>{formatBytes(file.size)}</h2>

      <img src={folderImage} alt={file.file_name} />
      <button 
        className={styles.downloadBtn} 
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}