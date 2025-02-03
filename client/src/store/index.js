import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authentication';
import hiddenSlice from './hiddenSlice';

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        hidden: hiddenSlice.reducer,
    }
})

export default store;