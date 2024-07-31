import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authentication';

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
    }
})

export default store;