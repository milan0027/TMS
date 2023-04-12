import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { exeStatsThunk, fraStatsThunk, proStatsThunk } from "./statThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  exeStats: null,
  proStats: null,
  fraStats: null,
};

export const exeStats = createAsyncThunk("stat/exeStats", exeStatsThunk);
export const proStats = createAsyncThunk("stat/proStats", proStatsThunk);
export const fraStats = createAsyncThunk("stat/fraStats", fraStatsThunk);

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: {
    [exeStats.pending]: (state) => {
      state.isLoading = true;
    },
    [exeStats.fulfilled]: (state, { payload }) => {
      const { resp } = payload;
      state.isLoading = false;
      state.exeStats = resp;
    },
    [exeStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [proStats.pending]: (state) => {
      state.isLoading = true;
    },
    [proStats.fulfilled]: (state, { payload }) => {
      const { resp } = payload;
      state.isLoading = false;
      state.proStats = resp;
    },
    [proStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [fraStats.pending]: (state) => {
      state.isLoading = true;
    },
    [fraStats.fulfilled]: (state, { payload }) => {
      const { resp } = payload;
      state.isLoading = false;
      state.fraStats = resp;
    },
    [fraStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

//export const { setOption } = statSlice.actions;
export default statSlice.reducer;
