import Image from "next/image";
import styles from "../styles/Navbar.module.css";

function NavButton(props) {
  return (
    <button className={styles.nav_btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

function NavLogo() {
  return (
    <div className={styles.nav_logo}>
      <Image
        src="/../public/near-protocol-near-logo.png"
        alt="near meerkat logo"
        width="40px"
        height="30px"
      />
      <div className={styles.nav_logo_text}>
        Near Zombies
      </div>
    </div>
  );
}

function NavItems() {
  return (
    <div className={styles.nav_list_container}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <NavButton>Register</NavButton>
        </li>
        <li className={styles.nav_item}>
          <NavButton>Sign In</NavButton>
        </li>
      </ul>
    </div>
  );
}

export function Navbar() {
  return (
    <div className={styles.nav_sticky}>
      <div className={styles.nav_container}>
        <div className={styles.nav}>
          <NavLogo />
          <NavItems />
        </div>
      </div>
    </div>
  );
}
