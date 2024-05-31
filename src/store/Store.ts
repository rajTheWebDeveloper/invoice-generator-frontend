import {configureStore} from '@reduxjs/toolkit'
import AccessSlice from './AccessSlice'


let Store=configureStore({
    reducer:{
        Access:AccessSlice
    }
})

export type RootState=ReturnType<typeof Store.getState>
export type AppDispatch=typeof Store.dispatch
export default Store