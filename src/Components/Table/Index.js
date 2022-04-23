import React, { useState } from "react";
import styles from "./style.module.scss";

import eye from "./../../assets/icons/eye.svg";
import copy from "./../../assets/icons/copy.svg";

function Table({ tableData }) {
  const [display, setDisplay] = useState({
    visibility: false,
    index: 0,
  });

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      alert("Copied");
    } catch (error) {
      console.log(error);
    }
  };

  const displayOptions = (index) => {
    if (index === display.index) {
      setDisplay({
        visibility: !display.visibility,
        index,
      });
    } else {
      setDisplay({
        visibility: true,
        index,
      });
    }
  };

  return (
    <div className={styles.Table}>
      <div className={styles.TableHeading}>
        <h2>My Files</h2>
        <div className={styles.TableHeadingForm}>
          <span>File Type</span>
          <select>
            <option>All</option>
            <option>File</option>
            <option>Folder</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr className={styles.TableHeader}>
            <th>Name</th>
            <th>CID</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!tableData?.length &&
            tableData.map((data, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <a
                      href={`https://gateway.moralisipfs.com/ipfs/${data.cID}`}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.tableRowName}
                    >
                      <span>{data.name}</span> <img src={eye} alt="preview" />
                    </a>
                  </div>
                  <div>
                    {data.date} {data.size}
                  </div>
                </td>
                <td>
                  <div onClick={() => copyToClipboard(data.cID)}>
                    {data.cID} <img src={copy} alt="copy" />
                  </div>
                </td>
                <td>{data.type}</td>
                <td>
                  <span onClick={() => displayOptions(index)}>More</span>
                  <div
                    className={styles.options}
                    style={{
                      display:
                        display.visibility && index === display.index
                          ? "block"
                          : "none",
                    }}
                  >
                    <span>Edit Details</span>
                    <span>Delete File</span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
