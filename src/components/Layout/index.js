import Main from "../Main"
import Nav from '../Nav'
import { createContext,useState } from "react";
import "./style.css";
export const dirContext = createContext({});


function Layout() {
  const dir = useState("uploads");
  const change = useState(true);

  return (
    <div className="layout-conteiner">
      <dirContext.Provider value={{ dirState: dir, changeState: change }}>
        <Main />
        <Nav />
      </dirContext.Provider>
    </div>
  );
}

export default Layout;
