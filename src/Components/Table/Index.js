import React, { useState } from "react";
import styles from "./style.module.scss";

import eye from "./../../assets/icons/eye.svg";
import copy from "./../../assets/icons/copy.svg";
import { useMoralis } from "react-moralis";
import Swal from "sweetalert2";

function Table({ tableData }) {
  const [display, setDisplay] = useState({
    visibility: false,
    index: 0,
  });
  const { Moralis } = useMoralis();

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

  const deleteRow = async (cID) => {
    Swal.fire({
      title: "Are you sure you want to remove this file?",
      html: `<small>${cID}</small><p>You won't be able to revert this!</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

    // const IPFSManager = Moralis.Object.extend("IPFSManager");
    // const query = new Moralis.Query(IPFSManager);
    // query.equalTo("cID", cID);
    // const result = await query.find();
    // if (result.length) {
    //   result[0].destroy().then(
    //     (myObject) => {
    //       console.log(myObject);
    //       alert("Deleted");
    //     },
    //     (error) => {
    //       alert("Error Deleting Data");
    //       console.log(error);
    //     },
    //   );
    // }
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
                    <span onClick={() => deleteRow(data.cID)}>Delete File</span>
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
