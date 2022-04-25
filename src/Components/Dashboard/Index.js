import React, { useEffect, useState } from "react";
import Card from "../Card/Index";
import Table from "../Table/Index";
import styles from "./style.module.scss";

function Dashboard({ tableData }) {
  const [dataCount, setDataCount] = useState({
    files: 0,
    folders: 0,
    total: 0,
  });

  useEffect(() => {
    if (tableData.length) {
      const files = tableData.filter(
        (type) => type.type.toLowerCase() === "file",
      );
      const folders = tableData.filter(
        (type) => type.type.toLowerCase() === "folder",
      );
      setDataCount({
        files: files.length,
        folders: folders.length,
        total: tableData.length,
      });
    }
  }, [tableData]);

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Cards}>
        <Card title={"Files"} value={dataCount.files} />
        <Card title={"Folders"} value={dataCount.folders} />
        <Card title={"Total"} value={dataCount.total} />
      </div>
      <div className={styles.hr}></div>
      <div className={styles.Table}>
        <Table tableData={tableData} />
      </div>
    </div>
  );
}

export default Dashboard;
