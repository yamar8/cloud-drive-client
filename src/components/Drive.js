import { useEffect, useState } from "react";
import "./Drive.css";
// import { Link } from "react-router-dom";

const axios = require("axios").default;

function Drive(props) {
  const { dir, setDir, change, setChange } = props;
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const onClickFile = async (v) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/files/read",
        { name: v.name, dir: v.dir }
      );
      const data = response.data;
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickFolder = async (v) => {
    setDir(v.dir + "/" + v.name);
  };
  useEffect(() => {
    async function fetchDir() {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/files/?dir=" + dir
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

  const onClickDeleteFile = (v) => {
    try {
      const response = axios.delete(
        "http://localhost:3002/api/files/deletefile",
        { data: { name: v.name, dir: v.dir } }
      );
      const data = response.data;
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setChange(!change);
  };

  const onClickDeleteFolder = (v) => {
    try {
      const response = axios.delete(
        "http://localhost:3002/api/files/deletefolder",
        { data: { name: v.name, dir: v.dir } }
      );
      const data = response.data;
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setChange((current) => {
      return !current;
    });
  };

  return (
    <div className="drive-container">
      <div className="drive-inner-container">
        <h1>Files:</h1>
        <div className="files-container">
          <div className="files-inner-container">
            {files?.map((v) => {
              return (
                <div className="file">
                  <div onClick={() => onClickFile(v)}>{v.name}</div>{" "}
                  <button onClick={() => onClickDeleteFile(v)}>X</button>
                </div>
              );
            })}
          </div>
        </div>
        <h1>Folders:</h1>
        <div className="folders-container">
          <div className="folders-inner-container">
            {folders?.map((v) => {
              return (
                <div className="folder">
                  {" "}
                  <div onClick={() => onClickFolder(v)}>{v.name}</div>
                  <button onClick={() => onClickDeleteFolder(v)}>X</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drive;
