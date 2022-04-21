import React from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Navbar() {
  const { isAuthenticated, logout } = useMoralis();

  return (
    <nav className={styles.Navbar}>
      <h3>
        <Link to={"/"}>IPFS-MANAGER</Link>
      </h3>
      {isAuthenticated ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
