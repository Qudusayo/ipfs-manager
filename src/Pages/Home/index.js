import React from "react";
import styles from "./styles.module.scss";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";

function Home() {
  const { isAuthenticated } = useMoralis();

  return (
    <div className={styles.Home}>
      <div className={styles.Info}>
        <h1>Managing IPFS hash in a quick and simple way.</h1>
        <div className={styles.buttonDiv}>
          <Link to={isAuthenticated ? "/dashboard" : "/login"}>
            <button>{isAuthenticated ? "DASHBOARD" : "GET STARTED"}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
