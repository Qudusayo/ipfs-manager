import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <h3>
        <Link to={"/"}>IPFS-MANAGER</Link>
      </h3>
      <button>LOGIN</button>
    </nav>
  );
}

export default Navbar;
