import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { digital } from "units-converter";
import Card from "../Card/Index";
import Table from "../Table/Index";
import styles from "./style.module.scss";

function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const { user } = useMoralis();
  const { data } = useMoralisQuery(
    "ipfsManager",
    (query) => query.equalTo("owner", user).descending("createdAt"),
    [user],
    { autoFetch: true }
  );

  useEffect(() => {
    const init = [];
    data &&
      data.forEach((_data) => {
        let unit = digital(_data.get("size")).from("b").toBest();
        init.push({
          name: _data.get("name"),
          cID: _data.get("ipfs_hash"),
          status: "pinned",
          size: `${unit.value.toFixed(1)} ${unit.unit.toUpperCase()}`,
          date: moment(_data.get("createdAt")).format("DD/MM/YYYY"),
        });
      });
    setTableData(init);
  }, [data]);

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Cards}>
        <Card title={"File"} value={3} />
        <Card title={"Folder"} value={2} />
        <Card title={"Total"} value={17} />
      </div>
      <hr />
      <Table tableData={tableData} />
    </div>
  );
}

export default Dashboard;

const getTableData = () => [
  {
    name: "markdown.md",
    cID: "QmYTZ6VQgfECCmaS5RdRC4DTnqh71gKTjQcRntep4zpang",
    status: "pinned",
    size: "460 B",
  },
  {
    name: "WaecPin",
    cID: "QmTupsEpUdNWRZA4NzxuYoprEnh6A48cKje7eBRqbnfM8n",
    status: "pinned",
    size: "12.06 KB",
  },
  {
    name: "check.svg",
    cID: "QmWEXaEYgcRQ9Lb1EAMCSrcUSP7UHLk9oxQztXDStGq9Lo",
    status: "pinned",
    size: "560 B",
  },
  {
    name: "portfolio",
    cID: "QmNsE6V12bjkaetkpA3DqQURYawG8PnPnEXkPR9L8cLS9e",
    status: "pinned",
    size: "4.6 MB",
  },
  {
    name: "rake.jpeg",
    cID: "QmaGt2pcqQDWc3r6ELRNp6EtK8HDphmkPXYbf5edbuiNBz",
    status: "pinned",
    size: "30.5 KB",
  },
];
