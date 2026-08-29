import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./FileCard.module.css";
import folderImage from ".././src/assets/folder.webp";

interface FileData {
  id: number;
  file_name: string;
  size: number;
}

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
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    if (!fileId) {
      setLoading(false);
      return;
    }

    const fetchFile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/getInfo?file_id=${fileId}`);

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

  const handleDownload = async () => {
    if (!file) return;

    try {
      setDownloading(true);
      const response = await fetch(`http://127.0.0.1:8000/download?file_id=${file.id}`);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.file_name;
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err: any) {
      alert(err.message || "Failed to download file");
    } finally {
      setDownloading(false);
    }
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
        disabled={downloading}
      >
        {downloading ? "Downloading..." : "Download"}
      </button>
    </div>
  );
}