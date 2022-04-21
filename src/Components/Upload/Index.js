import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import styles from "./style.module.scss";

function Upload() {
  const [uploadSize, setUploadSize] = useState(0);
  const [requiredUpload, setRequiredUpload] = useState(null);
  const [uploadName, setUploadName] = useState("");
  const { Moralis, user } = useMoralis();
  const { save } = useNewMoralisObject("ipfsManager");

  const onDrop = useCallback(async (acceptedFiles) => {
    let folderSize = 0;
    const binaryFolderArray = [];

    for (let index = 0; index < acceptedFiles.length; index++) {
      let content = await fileToBase64(acceptedFiles[index]);
      folderSize += acceptedFiles[index].size;
      binaryFolderArray.push({
        path: acceptedFiles[index].path.split("/").slice(2).join("/"),
        content,
      });
    }
    setUploadName("");
    setUploadSize(folderSize);

    if (acceptedFiles.length > 1) {
      setUploadName("");
    } else {
      let fileData = acceptedFiles[0];
      binaryFolderArray[0].path = fileData.path;
      setUploadName(fileData.path);
    }

    setRequiredUpload(binaryFolderArray);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const fileToBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (e) => reject(e);
    });

  const nameChangeHandler = (e) => {
    setUploadName(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(requiredUpload);

    let ipfs_hash;

    if (requiredUpload.length === 1) {
      const base64 = requiredUpload[0].content;
      const path = requiredUpload[0].path;
      const file = new Moralis.File(path, {
        base64,
      });
      await file.saveIPFS();
      ipfs_hash = file._hash;
    } else {
      const options = {
        abi: requiredUpload,
      };
      console.log(uploadSize, uploadName, requiredUpload);

      const uploadedData = await Moralis.Web3API.storage.uploadFolder(options);

      const ipfsHash = uploadedData[0].path.split("/")[4];
      console.log(uploadedData);
      ipfs_hash = ipfsHash;
    }

    const data = {
      ipfs_hash,
      size: uploadSize,
      name: uploadName,
      owner: user
    };

    save(data, {
      onSuccess: (savedData) => console.log("savedData", savedData),
      onError: (error) => console.log("Error", error),
    });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={styles.Upload}>
      <h2>Upload Manger</h2>
      <div className={styles.fileInput} {...getRootProps()}>
        <input
          {...getInputProps()}
          directory=""
          webkitdirectory=""
          type="file"
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            {requiredUpload
              ? "File Ready"
              : "Drag and drop some files here, or click to select files"}
          </p>
        )}
      </div>
      <form className={styles.UploadForm} onSubmit={formSubmitHandler}>
        <input value={uploadName} onChange={nameChangeHandler} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
