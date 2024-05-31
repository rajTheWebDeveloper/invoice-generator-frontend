import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SignInDetailsType , SignUpDetailsType, ProductsType} from '../interfaces/interface';

interface InitialStateType {
    name: string;
    token: string;
    msg: string;
    products:ProductsType[];
    SIGN_IN_LOADING: boolean;
    SIGN_IN_SUCCESS: boolean;
    SIGN_IN_ERROR: boolean;
    SIGN_UP_LOADING: boolean;
    SIGN_UP_SUCCESS: boolean;
    SIGN_UP_ERROR: boolean;
    ADD_PRODUCT_LOADING:boolean;
    ADD_PRODUCT_SUCCESS:boolean;
    ADD_PRODUCT_ERROR:boolean;
    DOWNLOAD_INVOICE_LOADING:boolean;
    DOWNLOAD_INVOICE_SUCCESS:boolean;
    DOWNLOAD_INVOICE_ERROR:boolean;
    GET_PRODUCTS_LOADING:boolean;
    GET_PRODUCTS_SUCCESS:boolean;
    GET_PRODUCTS_ERROR:boolean;
}

const initialState: InitialStateType = {
    name: "",
    token: localStorage.getItem('token') || "",
    msg: "",
    products:[],
    SIGN_IN_LOADING: false,
    SIGN_IN_SUCCESS: false,
    SIGN_IN_ERROR: false,
    SIGN_UP_LOADING: false,
    SIGN_UP_SUCCESS: false,
    SIGN_UP_ERROR: false,
    ADD_PRODUCT_LOADING:false,
    ADD_PRODUCT_SUCCESS:false,
    ADD_PRODUCT_ERROR:false,
    DOWNLOAD_INVOICE_LOADING:false,
    DOWNLOAD_INVOICE_SUCCESS:false,
    DOWNLOAD_INVOICE_ERROR:false,
    GET_PRODUCTS_LOADING:false,
    GET_PRODUCTS_SUCCESS:false,
    GET_PRODUCTS_ERROR:false,
}

const signInRequest = createAsyncThunk('access/signInRequest', async ({ email, password }: SignInDetailsType, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:2000/api/signin', { email, password });
        if (response.status) {
            return response.data;
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(error.response.data); // Pass error response data to rejected action
        } else {
            return rejectWithValue("Network error occurred. Please try again later.");
        }
    }
});

const signUpRequest = createAsyncThunk('access/signUpRequest', async ({name, email, password }: SignUpDetailsType, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:2000/api/signup', {name, email, password });
        if (response.status) {
            return response.data;
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(error.response.data); // Pass error response data to rejected action
        } else {
            return rejectWithValue("Network error occurred. Please try again later.");
        }
    }
});

const addProductRequest=createAsyncThunk('access/addToProduct',async ({productData,token}:any,{rejectWithValue})=>
{
    try 
    {
        let response=await axios.post('http://localhost:2000/api/product/add',productData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(response.status)
        {
            return response.data
        }
        else 
        {
            throw new Error("Internal Server Error");
        }
    }
    catch(error:any)
    {
        if (error.response) {
            return rejectWithValue(error.response.data); // Pass error response data to rejected action
        } else {
            return rejectWithValue("Network error occurred. Please try again later.");
        }
    }
})

const downloadInvoiceRequest=createAsyncThunk('access/downloadInvoice',async ({token}:any,{rejectWithValue})=>
{
    try 
    {
        console.log(token+"BLAZING")
        let response=await axios.post('http://localhost:2000/api/generate-pdf',{},{
            headers:{
                Authorization:`Bearer ${token}`
            },responseType: 'blob' 
        })

        if(response.status)
        {
            return response.data
        }
        else 
        {
            throw new Error("Internal Server Error");
        }
    }
    catch(error:any)
    {
        if (error.response) {
            return rejectWithValue(error.response.data); // Pass error response data to rejected action
        } else {
            return rejectWithValue("Network error occurred. Please try again later.");
        }
    }
})

let getProductsRequest=createAsyncThunk('access/getProductsRequest',async ()=>
{
    try 
    {
        let response=await axios.get('http://localhost:2000/api/products/get')
        if(response.status)
        {
            return response.data
        }
        else 
        {
            throw new Error("Internal Server Error");
        }
    }
    catch(error:any)
    {
        console.log(error)
    }
})

const AccessSlice = createSlice({
    name: "access",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signInRequest.pending, (state) => {
                state.SIGN_IN_LOADING = true;
                state.SIGN_IN_SUCCESS = false;
                state.SIGN_IN_ERROR = false;
                state.msg=""
            })
            .addCase(signInRequest.fulfilled, (state, action) => {
                state.SIGN_IN_LOADING = false;
                state.SIGN_IN_SUCCESS = true;
                state.SIGN_IN_ERROR = false;
                if (action.payload.data) {
                    const { name, token} = action.payload.data;
                    state.name = name;
                    state.msg=action.payload.message;
                    state.token = token;
                    localStorage.setItem('token', token); // Save token to localStorage
                }
            })
            .addCase(signInRequest.rejected, (state, action) => {
                state.SIGN_IN_LOADING = false;
                state.SIGN_IN_SUCCESS = false;
                state.SIGN_IN_ERROR = true;
                let errorData:any=action.payload;
                state.msg=errorData.message;
                state.token="";
                localStorage.removeItem('token'); // Remove token from localStorage
            })
            .addCase(signUpRequest.pending, (state) => {
                state.SIGN_UP_LOADING = true;
                state.SIGN_UP_SUCCESS = false;
                state.SIGN_UP_ERROR = false;
                state.msg=""
            })
            .addCase(signUpRequest.fulfilled, (state, action) => {
                state.SIGN_UP_LOADING = false;
                state.SIGN_UP_SUCCESS = true;
                state.SIGN_UP_ERROR = false;
                if (action.payload.data) {
                    const { name} = action.payload.data;
                    state.msg=action.payload.message;
                }
            })
            .addCase(signUpRequest.rejected, (state, action) => {
                state.SIGN_UP_LOADING = false;
                state.SIGN_UP_SUCCESS = false;
                state.SIGN_UP_ERROR = true;
                let errorData:any=action.payload;
                state.msg=errorData.message;
                state.token="";
                localStorage.removeItem('token'); // Remove token from localStorage
            })
            .addCase(addProductRequest.pending, (state) => {
                state.ADD_PRODUCT_LOADING = true;
                state.ADD_PRODUCT_SUCCESS = false;
                state.ADD_PRODUCT_ERROR = false;
                state.msg=""
            })
            .addCase(addProductRequest.fulfilled, (state, action) => {
                state.ADD_PRODUCT_LOADING = false;
                state.ADD_PRODUCT_SUCCESS = true;
                state.ADD_PRODUCT_ERROR= false;
                if (action.payload.data) {
                    const { name} = action.payload.data;
                    state.msg=action.payload.message;
                }
            })
            .addCase(addProductRequest.rejected, (state, action) => {
                state.ADD_PRODUCT_LOADING = false;
                state.ADD_PRODUCT_SUCCESS = false;
                state.ADD_PRODUCT_ERROR= true;
                let errorData:any=action.payload;
                state.msg=errorData.message;
                state.token="";
                localStorage.removeItem('token'); // Remove token from localStorage
            })
            .addCase(getProductsRequest.pending,(state)=>
            {
                state.GET_PRODUCTS_LOADING=true;
                state.GET_PRODUCTS_SUCCESS=false;
                state.ADD_PRODUCT_ERROR = false;
                state.msg=""
            })
            .addCase(getProductsRequest.fulfilled,(state,action)=>
            {
                state.GET_PRODUCTS_LOADING=false;
                state.GET_PRODUCTS_SUCCESS=true;
                state.ADD_PRODUCT_ERROR = false;
                state.products=action.payload.data;
            })
            .addCase(getProductsRequest.rejected,(state,action)=>
            {
                state.GET_PRODUCTS_LOADING=false;
                state.GET_PRODUCTS_SUCCESS=false;
                state.ADD_PRODUCT_ERROR = true;
                let errorData:any=action.payload;
                state.msg=errorData.message;
                state.token="";
                localStorage.removeItem('token'); // Remove token from localStorage
            })
            .addCase(downloadInvoiceRequest.pending, (state) => {
                state.DOWNLOAD_INVOICE_LOADING = true;
                state.DOWNLOAD_INVOICE_SUCCESS = false;
                state.DOWNLOAD_INVOICE_ERROR = false;
                state.msg=""
            })
            .addCase(downloadInvoiceRequest.fulfilled, (state, action) => {
                state.DOWNLOAD_INVOICE_LOADING = false;
                state.DOWNLOAD_INVOICE_SUCCESS = true;
                state.DOWNLOAD_INVOICE_ERROR= false;
                if (action.payload.data) {
                    const { name} = action.payload.data;
                    state.msg=action.payload.message;
                }
            })
            .addCase(downloadInvoiceRequest.rejected, (state, action) => {
                state.DOWNLOAD_INVOICE_LOADING = false;
                state.DOWNLOAD_INVOICE_SUCCESS = false;
                state.DOWNLOAD_INVOICE_ERROR= true;
                let errorData:any=action.payload;
                state.msg=errorData.message;
                state.token="";
                localStorage.removeItem('token'); // Remove token from localStorage
            })
    }
});

export default AccessSlice.reducer;
export { signInRequest, signUpRequest, addProductRequest, getProductsRequest, downloadInvoiceRequest };
