import Image from "next/image";
import imgNearLogo from '/public/near-protocol-near-logo.png'
import imgStartButton from '/public/start-butotn.png'
import styles from "../styles/WelcomeCard.module.css";

function WelcomeText() {
  return (
    <div className={styles.card_text}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc fermentum eu
      mi at semper Vestibulum pulvinar, ipsum vitae dictum consequat, lorem arcu
      ultrices nunc, a porttitor est tellus vitae nisl Donec suscipit nunc mi,
      et auctor tellus consectetur et Cras quis fermentum nisi, vitae
    </div>
  );
}

function NearCoin() {
  return (
    <div className={styles.nearcoin}>
      <Image
        src={imgNearLogo}
        alt="near meerkat logo"
        width="266px"
        height="200px"
      />
    </div>
  );
}

function WelcomeButton() {
  return (
    <div className={styles.card_img_container}>
      <div className={styles.card_img}>
        <Image
          src={imgStartButton}
          alt="near meerkat logo"
          layout="fill"
        />
      </div>
    </div>
  );
}

export function WelcomeCard() {
  return (
    <div className={styles.card}>
      <NearCoin />
      <WelcomeText />
      <WelcomeButton />
    </div>
  );
}
