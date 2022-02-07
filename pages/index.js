import Head from "next/head";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { WelcomeCard } from "../components/WelcomeCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <WelcomeCard />
      <WelcomeCard />
      <Footer />
    </div>
  );
}
