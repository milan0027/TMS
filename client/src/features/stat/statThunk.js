import customFetch from "../../utils/axios";
//import authHeader from "../../utils/userAuthHeader";

export const exeStatsThunk = async (_, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    const resp = await customFetch.get("/api/submit/exeStats");
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const proStatsThunk = async (_, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    const resp = await customFetch.get("/api/submit/proStats");
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const fraStatsThunk = async (obj, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    const resp = await customFetch.post("/api/submit/fraStats",obj);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
