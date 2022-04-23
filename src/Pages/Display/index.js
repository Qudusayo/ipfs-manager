import React from "react";
import Sidebar from "../../Components/SideBar/Index";
import Dashboard from "../../Components/Dashboard/Index";
import Upload from "../../Components/Upload/Index";

import styles from "./styles.module.scss";

function Display({ path, tableData }) {
  return (
    <div className={styles.Display}>
      <div className={styles.Sidebar}>
        <Sidebar />
      </div>
      <div className={styles.Container}>
        {path === "dashboard" && <Dashboard tableData={tableData} />}
        {path === "upload" && <Upload />}
      </div>
    </div>
  );
}

export default Display;
