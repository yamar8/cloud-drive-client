import { getValue } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import "./Nav.css";
const axios = require("axios").default;

function Nav(props) {
  const { dir, setDir, change, setChange } = props;
  const [file, setFile] = useState({ fileName: "", size: "", type: "" });
  const [folderName, setFolderName] = useState("");

  const onClickNewFolder = () => {
    try {
      if (!folderName) return;
      const response = axios.post("http://localhost:3002/api/files/newfolder", {
        name: folderName,
        dir: dir,
      });
      const data = response.data;
      console.log(data);
      setChange((current) => {
        return !current;
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitUpload = (e) => {
    e.preventDefault();
    console.dir(e.target.fileInput);
    let bodyFormData = new FormData();
    // console.log(bodyFormData);
    bodyFormData.append("fileName", e.target.fileInput.files[0]);
    bodyFormData.append("dir", dir); //it will be in the body.

    console.log(bodyFormData);
    axios({
      method: "post",
      url: "http://localhost:3002/api/files/upload",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    setChange(!change);
  };

  const onChangeHandler = (e) => {
    const fileSize = e.target.files[0].size / 1000 + "KB";

    setFile((current) => {
      return {
        ...current,
        fileName: e.target.files[0].name,
        size: fileSize,
        type: e.target.files[0].types,
      };
    });
  };

  return (
    <div className="nav-container">
      <div className="inner-nav-container">
        <div className="file-form-container">
          <form onSubmit={onSubmitUpload}>
            <input
              name="fileInput"
              type="file"
              onChange={onChangeHandler}
            ></input>
            <button>Upload</button>
            {/* <h3>File Name: {file.fileName} </h3>
          <h3> File Size: {file.size} </h3> 
          <h3> File Type: {file.type}</h3> */}
          </form>
        </div>

        <div className="folder-form-container">
          <button onClick={onClickNewFolder}>New Folder</button>
          <input type="text" onChange={(e) => setFolderName(e.target.value)} />

        </div>
      </div>
    </div>
  );
}

export default Nav;
