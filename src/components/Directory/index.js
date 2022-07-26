import './style.css';
import {useContext} from 'react';
import { dirContext } from '../Layout';

function Directory(){

  const {dirState} = useContext(dirContext);
  const [dir,setDir] = dirState;

    const onClickBack = () => {
        if (dir === "uploads") return; //root folder - prevent user from back
        setDir((current) => {
          return current.slice(0, current.lastIndexOf("/"));
        });
      };
    
    return (
    <div className='directory-conteiner'>

        <div className="diractory">
            <button onClick={onClickBack}>Back</button>
            <div>dir: {dir}</div>
          </div>


    </div>)
}

export default Directory;