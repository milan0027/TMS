import {configureStore} from '@reduxjs/toolkit';
import navitemSlice from './features/navitem/navitemSlice';
import userSlice from "./features/user/userSlice";
import statSlice from './features/stat/statSlice';


const store = configureStore({
    reducer: {
        user: userSlice,
        navitem: navitemSlice,
        stat:statSlice,
    }
});

export default store;