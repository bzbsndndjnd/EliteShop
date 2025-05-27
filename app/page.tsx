import Image from "next/image";
import styles from "./page.module.css";
import Websites from "./website/page";

export default function Home() {
  return (
    <div >
      <main>
        <Websites/>
      </main>  
      </div>
  );
}
