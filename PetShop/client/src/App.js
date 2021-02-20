import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initWeb3 } from "./store/adoptSlice";
import './App.css';
import Adopters from './components/Adopters';

function App() {
  const dispatch = useDispatch();
  const web3 = useSelector((state) => {
   // console.log("state = ", state)
    return state.adoptReducer.web3
  })

  useEffect(() => {
    dispatch(initWeb3())
  }, [])

  return (
    <div className="App">
      <h1>Pet Shop</h1>
      <Adopters/>
      <br/>
    </div>
  );
}

export default App;
