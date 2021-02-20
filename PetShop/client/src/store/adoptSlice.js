import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import Adoption from "../contracts/Adoption.json"

export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async (data, thunkAPI) => {
        try {
            //console.log(thunkAPI.dispatch);
            if (Web3.givenProvider) {
                const web3 = new Web3(Web3.givenProvider);
                await Web3.givenProvider.enable();
                //   console.log(web3)
                const networkId = await web3.eth.net.getId();
                const network = Adoption.networks[networkId];

                const contract = new web3.eth.Contract(Adoption.abi, network.address);
                const addresses = await web3.eth.getAccounts();
                thunkAPI.dispatch(loadAdopters({
                    contract,
                    address:addresses[0]
                }));
                return {
                    web3: web3,
                    contract: contract,
                    address: addresses[0]
                }
            } else {
                console.log("Error in loading Web3")
            }
        } catch (error) {
            console.log("Error Loading in Blockchain App", error)
        }
    }

)

export const loadAdopters = createAsyncThunk(
    "LoadAdopters",
    async (data, thunkAPI) => {
        try {
            const adopterList = await data.contract.methods.getAdopters().call();
            return adopterList;
        } catch (error) {
            console.log("Error in Load Adapter: ", error);
        }
    }
)

const adoptSlice = createSlice({
    name: "AdoptSlice",
    initialState: {
        web3: null,
        contract: null,
        address: null,
        adopters:[]
    },
    reducers: {
        adopt: () => {

        }
    },
    extraReducers: {
        [initWeb3.fulfilled]: (state, action) => {
            // console.log("In fulfill =",action.payload)
            state.web3 = action.payload.web3
            state.contract = action.payload.contract
            state.address = action.payload.address
        },
        [loadAdopters.fulfilled]: (state, action) =>{
            state.adopters = action.payload
        }
    }
})

export const adoptReducer = adoptSlice.reducer;
export const { adopt } = adoptSlice.actions;
