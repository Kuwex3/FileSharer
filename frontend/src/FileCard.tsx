import styles from "./FileCard.module.css";
import folderImage from ".././src/assets/folder.webp"

interface FileCardProps {
  file: {
    id: string;
    name: string;
    size: string;
    uploadedAt: string;
  };
}

export default function FileCard( {file}: FileCardProps ) {
    if (!file) {
        return(
            <div className={styles.cardDiv}>
                <h1>Loading content...</h1>
            </div>
        )
    }
    return(
        <div className={styles.cardDiv}>
            <h1>{file.name}</h1>
            <h2>{file.size}</h2>
            <img src={folderImage} alt="" />
            <button className={styles.downloadBtn}>Download</button>
        </div>
    )
}