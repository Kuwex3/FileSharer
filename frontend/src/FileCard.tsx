import styles from "./FileCard.module.css";
import folderImage from ".././src/assets/45480a3100a9edc6bf3b0ce03b3830e4-blue-folder-rounded.webp"

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
                <h1>Loading...</h1>
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