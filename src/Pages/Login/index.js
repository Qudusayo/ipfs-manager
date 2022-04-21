import React from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Login() {
  const { authenticate } = useMoralis();

  const login = () =>
    authenticate({
      provider: "metamask",
      clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID,
      onSuccess: (user) => {
        console.log(user);
      },
      onError: (err) => console.log,
    });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.ImageBanner}></div>
      <div className={styles.loginForm}>
        <div className={styles.loginFormContent}>
          <h2>
            <Link to={"/"}>IPFS Manager</Link>
          </h2>
          <p>One Click Login</p>
          <button onClick={login}>Login Now!</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
