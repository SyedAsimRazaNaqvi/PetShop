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
                    address: addresses[0]
                }));
                return {
                    web3: web3,
                    contract: contract,
                    address: addresses[0]
                }
            } else {
                // console.log("Error in loading Web3")
                alert("Web3 Failed to load");
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

export const adoptPet = createAsyncThunk(
    "AdoptPet",
    async (petIndex, thunkAPI) => {

        console.log("Try to adopt pet");
        const { contract, address } = await thunkAPI.getState().adoptReducer;
        //console.log(contract,address)
        const result = await contract.methods.adopts(petIndex).send({ from: address });
        console.log("after adopt = ", adopt);
        return { adopterAddress: result.from, petIndex: petIndex };
    }
)


export const removePet = createAsyncThunk(
    "RemovePet",
    async (petIndex, thunkAPI) => {
        const { contract, address } = await thunkAPI.getState().adoptReducer;
        //console.log(contract,address)
        const result = await contract.methods.removeAdoption(petIndex).send({ from: address });
        return { adopterAddress: result.from, petIndex: petIndex };
    }
)

const adoptSlice = createSlice({
    name: "AdoptSlice",
    initialState: {
        web3: null,
        contract: null,
        address: null,
        adopters: [],
        InProgress: false,
        error: false,
        errMessage: ""
    },
    reducers: {
        adopt: () => {

        }
    },
    extraReducers: {
        [initWeb3.fulfilled]: (state, action) => {
            state.web3 = action.payload.web3
            state.contract = action.payload.contract
            state.address = action.payload.address
        },
        [loadAdopters.fulfilled]: (state, action) => {
            state.adopters = action.payload
        },
        [adoptPet.fulfilled]: (state, action) => {
            state.adopters[action.payload.petIndex] = action.payload.adopterAddress;
            state.InProgress = false;
            state.error = false;
        },
        [adoptPet.pending]: (state, action) => {
            state.InProgress = true;
            state.error = false;
        },
        [adoptPet.rejected]: (state, action) => {
            state.InProgress = false;
            state.error = true;
            state.errMessage = action.error.message
        },
        [removePet.fulfilled]: (state, action) => {
            state.adopters[action.payload.petIndex] = action.payload.adopterAddress;
            state.InProgress = false;
            state.error = false;
        },
        [removePet.pending]: (state, action) => {
            state.InProgress = true;
            state.error = false;
        },
        [removePet.rejected]: (state, action) => {
            state.InProgress = false;
            state.error = true;
            state.errMessage = action.error.message
        }
    }
})

export const adoptReducer = adoptSlice.reducer;
export const { adopt } = adoptSlice.actions;
