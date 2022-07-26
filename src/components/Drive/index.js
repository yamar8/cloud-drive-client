import { useEffect, useState } from "react";
import "./style.css";
import { useContext } from "react";
import { dirContext } from "../Layout";
import Directory from "../Directory";
const axios = require("axios").default;

// import { Link } from "react-router-dom";

function Drive() {
  // const { dir, setDir, change, setChange } = props;
  const { dirState, changeState } = useContext(dirContext);
  const [dir, setDir] = dirState;
  const [change, setChange] = changeState;

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const onClickFile = async (v) => {
    axios({
      url: "https://drive-server-yamar8.herokuapp.com/api/files/download",
      method: "POST",
      responseType: "blob", // important
      data: {
        // This is the body part
        name: v.name,
        dir: v.dir,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", v.name);
      document.body.appendChild(link);
      link.click();
    });
  };

  const onClickFolder = async (v) => {
    setDir(v.dir + "/" + v.name);
  };
  useEffect(() => {
    async function fetchDir() {
      try {
        const response = await axios.get(
          "https://drive-server-yamar8.herokuapp.com/api/files/?dir=" + dir
        );
        const data = response.data;
        console.log(data);
        setFiles(data.filter((v) => v.type === "file"));
        setFolders(data.filter((v) => v.type === "folder"));
      } catch (e) {
        console.log(e);
      }
    }
    fetchDir();
  }, [dir, change]);

  const onClickDeleteFile = async (v) => {
    try {
      const response = await axios.delete(
        "http://localhost:3002/api/files/deletefile",
        { data: { name: v.name, dir: v.dir } }
      );
      const data = response;
      if (data) setChange(!change);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDeleteFolder = (v) => {
    try {
      const response = axios.delete(
        "https://drive-server-yamar8.herokuapp.com/api/files/deletefolder",
        { data: { name: v.name, dir: v.dir } }
      );
      const data = response;
      if (data) setChange(!change);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="drive-container">
      <div className="drive-inner-container">
        <Directory />
        <div className="file-explorer">
          <h3>Files:</h3>
          <div className="files-container">
            <div className="files-inner-container">
              {files?.map((v) => {
                return (
                  <div className="file-conteiner">
                    <div className="file">
                      <div onClick={() => onClickFile(v)}>{v.name}</div>{" "}
                    </div>
                    <button onClick={() => onClickDeleteFile(v)}>X</button>
                  </div>
                );
              })}
            </div>
          </div>
          <h3>Folders:</h3>
          <div className="folders-container">
            <div className="folders-inner-container">
              {folders?.map((v) => {
                return (
                  <div className="folder-conteiner">
                    <div className="folder">
                      <div onClick={() => onClickFolder(v)}>{v.name}</div>
                    </div>
                    <button onClick={() => onClickDeleteFolder(v)}>X</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drive;
