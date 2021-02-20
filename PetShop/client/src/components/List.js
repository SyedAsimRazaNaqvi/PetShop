import { useSelector } from "react-redux";
import petListJson from "../pets.json";
function List() {
    const address = useSelector(state => state.adoptReducer.address)
    const contract = useSelector(state => state.adoptReducer.contract)
    const adopters = useSelector(state => state.adoptReducer.adopters)
   // console.log(contract,address)
    return (<div>
        <h3>Current Address: {address}</h3>
        <h2>Pet List</h2>
        {petListJson.map((item, index) => {
            return <div style={{border: "1px solid black",display:"inline-block",padding:"20px",margin:"5px"}} key={item.id}>
                <h4>  {item.name} </h4>
                <img src={item.picture} alt="140x140" width="200px" /><br/>
                <strong>Breed</strong>: <span >Golden Retriever</span><br />
                <strong>Age</strong>: <span >3</span><br />
                <strong>Location</strong>: <span >Warren, MI</span><br /><br />
                {  adopters[item.id] == "0x0000000000000000000000000000000000000000" ?  <button onClick={async()=>{
                    const adopt = await contract.methods.adopts(item.id).send({from: address})
                    console.log("adter adopt = ",adopt);
                    const adopterList = contract.methods.getAdopters().call();
                    console.log("adopter list = ",adopterList);
                }} >Adopt</button> : <div><b>Already Adopted!</b></div>}
               
            </div>
        })}
    </div>
    )
}
export default List;