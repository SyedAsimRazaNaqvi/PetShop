import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initWeb3,loadAdopters } from "./store/adoptSlice";
import './App.css';
import Adopters from './components/Adopters';

function App() {
  const dispatch = useDispatch();
  const {web3,contract,adopters} = useSelector((state) => {
   // console.log("state = ", state)
    return state.adoptReducer
  })

  useEffect(() => {
      dispatch(initWeb3())
  }, [])

  //   useEffect(() => {
  //   setTimeout(async() => {
  //     console.log(adopters)
  //     dispatch(loadAdopters())
  //   }, 2000);
    
  // }, [web3,contract,adopters])
//console.log(web3,contract,adopters)
  return (
    <div className="App">
      <h1>Pet Shop</h1>
      <Adopters/>
      <br/>
    </div>
  );
}

export default App;
