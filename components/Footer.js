import styles from '../styles/Footer.module.css'
import {FaGithub} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'

function FooterItems() {
  return (
    <ul className={styles.footer_list}>
      <li><a href="https://github.com/hasanozkul/nearzombies" target="_blank" rel="noreferrer"><FaGithub className={styles.footer_icon}/></a></li>
      <li><a href="https://github.com/hasanozkul/nearzombies" target="_blank" rel="noreferrer"><FaGithub className={styles.footer_icon}/></a></li>
      <li><a href="https://github.com/hasanozkul/nearzombies" target="_blank" rel="noreferrer"><FaGithub className={styles.footer_icon}/></a></li>
      <li><a href="https://github.com/hasanozkul/nearzombies" target="_blank" rel="noreferrer"><FaGithub className={styles.footer_icon}/></a></li>
    </ul>
  );
}

function FooterText() {
  return (
    <div className={styles.footer_text}>
      <p>Made with <FaHeart /> by zombies.</p>
    </div>
  );
}

export function Footer() {
  return (
    <div className={styles.footer_container}>
      <footer className={styles.footer}>
        <FooterItems/>
        <FooterText/>
      </footer>
    </div>
  );
}
