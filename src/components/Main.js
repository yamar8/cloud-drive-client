import { useState } from "react";
import Drive from "./Drive";
import Directory from "./Directory";
import Nav from "./Nav";


function Main() {
  const [dir, setDir] = useState("uploads");
  const [change, setChange] = useState(true);

  return (
    <div className="container">
      <Nav setDir={setDir} dir={dir} change={change} setChange={setChange}/>
      <Directory dir={dir} setDir={setDir}/>
      <Drive dir={dir} setDir={setDir} change={change} setChange={setChange}/>
    </div>
  );
}

export default Main;
