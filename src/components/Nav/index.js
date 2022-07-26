import { useState,useContext } from "react";
import Directory from "../Directory";
import { dirContext } from "../Layout";
import "./style.css";
const axios = require("axios").default;

function Nav() {
  const {dirState,changeState} = useContext(dirContext);
  const [dir,setDir] = dirState;
  const [change,setChange] = changeState;
  
  const [file, setFile] = useState({ fileName: "", size: "", type: "" });
  const [folderName, setFolderName] = useState("");

  const onClickNewFolder = async () => {
    try {
      if (!folderName) return;
      const response = await axios.post("https://drive-server-yamar8.herokuapp.com/api/files/newfolder", {
        name: folderName,
        dir: dir,
      });
      setChange(!change);
      const data = response;
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
      url: "https://drive-server-yamar8.herokuapp.com/api/files/upload",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setChange(!change);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
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
