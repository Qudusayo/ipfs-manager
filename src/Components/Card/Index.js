import React from "react";
import styles from "./styles.module.scss";

function Card({ title, value }) {
  return (
    <div className={styles.Card}>
      <span>{title}</span>
      <h1>{value}</h1>
    </div>
  );
}

export default Card;
