import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import styles from "./style.module.scss";

function Upload() {
  const [uploadSize, setUploadSize] = useState(0);
  const [requiredUpload, setRequiredUpload] = useState(null);
  const [uploadName, setUploadName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { Moralis, user } = useMoralis();
  const { save } = useNewMoralisObject("IPFSManager");

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    if (isUploading) return;

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
    setIsUploading(true);

    console.log(requiredUpload);

    const data = {
      size: uploadSize,
      name: uploadName,
      owner: user,
    };

    if (requiredUpload.length === 1) {
      const base64 = requiredUpload[0].content;
      const path = requiredUpload[0].path;
      const file = new Moralis.File(path, {
        base64,
      });
      await file.saveIPFS();
      data.cID = file._hash;
      data.type = "File";
    } else {
      const options = {
        abi: requiredUpload,
      };
      console.log(uploadSize, uploadName, requiredUpload);

      const uploadedData = await Moralis.Web3API.storage.uploadFolder(options);

      const ipfsHash = uploadedData[0].path.split("/")[4];
      console.log(uploadedData);
      data.cID = ipfsHash;
      data.type = "Folder";
    }

    save(data, {
      onSuccess: (savedData) => {
        setRequiredUpload(null);
        setIsUploading(false);
        setUploadName("");
        Toast.fire({
          icon: "success",
          title: "File uploaded successfully",
        });
        console.log("savedData", savedData);
      },
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
        <label htmlFor="uploadName">File Name:</label>
        <input
          id="uploadName"
          value={uploadName}
          onChange={nameChangeHandler}
        />
        <button
          type="submit"
          disabled={!!!uploadName || !!!requiredUpload || isUploading}
        >
          Upload
        </button>
        {isUploading && (
          <span
            style={{
              display: "block",
              textAlign: "center",
              margin: "2em 0",
            }}
          >
            Depending on the size of your upload, this process may take some
            time.
            <br />
            <br />
            Please do not leave this page until the upload is completed.
          </span>
        )}
      </form>
    </div>
  );
}

export default Upload;
