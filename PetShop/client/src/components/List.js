import { useSelector, useDispatch } from "react-redux";
import petListJson from "../pets.json";
import { adoptPet, removePet } from "../store/adoptSlice";

function List() {
    const address = useSelector(state => state.adoptReducer.address)
    //  const contract = useSelector(state => state.adoptReducer.contract)
    const adopters = useSelector(state => state.adoptReducer.adopters)
    const {InProgress, error ,errMessage} = useSelector(state => state.adoptReducer)
    
    const dispatch = useDispatch()

    return (<div>
        <h3>Current Address: {address}</h3>
        {
            InProgress ?
                <div>
                    <img src='images/progress.gif' style={{ width: "150px" }} />
                </div> : null
        }

{
            error ?
                <div>
                    <p style={{color:"red"}}>{errMessage}</p>
                </div> : null
        }

        <h2>Pet List</h2>
        {petListJson.map((item, index) => {
            return <div style={{ border: "1px solid black", display: "inline-block", padding: "20px", margin: "5px" }} key={item.id}>
                <h4>  {item.name} </h4>
                <img src={item.picture} alt="140x140" width="200px" /><br />
                <strong>Breed</strong>: <span >Golden Retriever</span><br />
                <strong>Age</strong>: <span >3</span><br />
                <strong>Location</strong>: <span >Warren, MI</span><br /><br />
                {adopters[item.id] == "0x0000000000000000000000000000000000000000" ? <button onClick={async () => {
                    dispatch(adoptPet(item.id));
                }} >Adopt</button> : <div>{adopters[item.id] == address ? <button onClick={async () => {
                    dispatch(removePet(item.id));
                }} >Remove</button> : <b>Adopted Pet!</b>}</div>}
            </div>
        })}
    </div>
    )
}
export default List; 