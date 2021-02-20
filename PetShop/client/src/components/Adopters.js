import { useSelector } from "react-redux";
import List from "./List";

function Adopters() {
    const adopters = useSelector(state => state.adoptReducer.adopters)
    //console.log(adopters)
    return (
        <div>
            <h3>Here is the Adopters List</h3>
           {adopters.map((list,index)=>(
              list != "0x0000000000000000000000000000000000000000" ? <div keys={adopters[index]}>Pet Id = [{index}] - {list}</div> : null
           ))}
           <hr/>
            <List />
        </div>
    )
}
export default Adopters;