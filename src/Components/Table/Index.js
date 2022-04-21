import React from "react";
import styles from "./style.module.scss";

import eye from "./../../assets/icons/eye.svg";
import copy from "./../../assets/icons/copy.svg";

function Table({ tableData }) {
  return (
    <div className={styles.Table}>
      <table>
        <thead>
          <tr className={styles.TableHeader}>
            <th>Name</th>
            <th>CID</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!tableData?.length &&
            tableData.map((data, index) => (
              <tr key={index}>
                <td>
                  <div className={styles.tableRowName}>
                    <a
                      href={`https://gateway.moralisipfs.com/ipfs/${data.cID}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{data.name}</span> <img src={eye} alt="preview" />
                    </a>
                  </div>
                  <div>
                    {data.date} {data.size}
                  </div>
                </td>
                <td>
                  {data.cID} <img src={copy} alt="copy" />
                </td>
                <td>{data.status}</td>
                <td>More</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
