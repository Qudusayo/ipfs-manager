import React from "react";
import styles from "./styles.module.scss"

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.Info}>
        <h1>Managing IPFS hash in a quick and simple way.</h1>
        <div className={styles.buttonDiv}>
          <button>GET STARTED</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
