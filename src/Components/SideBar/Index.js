import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss"

function Sidebar() {
  return (
    <div className={styles.Sidebar}>
      <div>
        <Link to={"/dashboard"}>Dashboard</Link>
      </div>
      <div>
        <Link to={"/upload"}>Upload</Link>
      </div>
    </div>
  )
}

export default Sidebar;