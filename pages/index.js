import Head from "next/head";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Image from "next/image";
import { WelcomeCard } from "../components/WelcomeCard";
import imgBackground from "/public/hpbg.png";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.bg}>
        <Image src={imgBackground} layout="fill"/>
      </div>
      <WelcomeCard />
      <WelcomeCard />
      <Footer />
    </div>
  );
}
