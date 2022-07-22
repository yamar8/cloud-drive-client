import './Directory.css';

function Directory(props){

    const {dir,setDir} = props;

    const onClickBack = () => {
        if (dir === "uploads") return; //root folder - there is no back
        setDir((current) => {
          return current.slice(0, current.lastIndexOf("/"));
        });
      };
    
    return (
    <div className='directory-conteiner'>

        <div className="diractory">
            <button onClick={onClickBack}>Back</button>
            <div>dir: {JSON.stringify(dir)}</div>
          </div>


    </div>)
}

export default Directory;