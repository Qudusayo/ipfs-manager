import React from "react";
import Sidebar from "../../Components/SideBar/Index";
import Dashboard from "../../Components/Dashboard/Index";
import Upload from "../../Components/Upload/Index";

import styles from "./styles.module.scss";

function Display({ path }) {

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Sidebar}>
        <Sidebar />
      </div>
      <div className={styles.Container}>
        {path === "dashboard" && <Dashboard />}
        {path === "upload" && <Upload />}
      </div>
    </div>
  );
}

export default Display;