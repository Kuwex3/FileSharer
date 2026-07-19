import styles from './DroplinePage.module.css';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <nav className={styles.nav}>
          <a href="https://github.com/kuwex3/" className={styles.navlink} target='_blank'>github</a>
        </nav>
      </header>

      <main className={styles.hero}>
        <p className={styles.eyebrow}>// self-hosted file transfer</p>

        <h1 className={styles.headline}>
          Send it
          <br />
          straight there.
        </h1>
        
        <div className={styles.contentRow}>
          <div className={styles.textContent}>
            <p className={styles.subhead}>
              No cloud storage, no accounts to create. Files move directly
              between your server and the people you trust.
            </p>
            
            <Link to="/upload" className={styles.uploadBtn}>
              Upload File
            </Link>
          </div>

        <div className={styles.wire} aria-hidden="true">
          <div className={styles.node}>
            <span className={styles.nodeLabel}>you</span>
          </div>
          
          <div className={styles.line}>
            <span className={styles.packet} />
          </div>
          <div className={styles.node}>
            <span className={styles.nodeLabel}>them</span>
          </div>
        </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureTitle}>self-hosted</span>
              <span className={styles.featureText}>runs on your own server</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.feature}>
              <span className={styles.featureTitle}>no accounts</span>
              <span className={styles.featureText}>nothing to sign up for</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.feature}>
              <span className={styles.featureTitle}>private by default</span>
              <span className={styles.featureText}>files pass directly between you</span>
            </div>
          </div>
          <p className={styles.credit}>made for friends who need to send a file, fast.</p>
        </div>
      </footer>
    </div>
  );
}