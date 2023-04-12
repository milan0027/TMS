import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeader";

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    //const user = thunkAPI.getState().user.user
    const resp = await customFetch.post("/api/auth/register", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/auth/login", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loadUserThunk = async(_, thunkAPI) => {
    try{
        const resp = await customFetch.get("/api/auth", authHeader(thunkAPI));
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const submitMeetingThunk = async(obj, thunkAPI) => {
  try{
    console.log(obj)
      const resp = await customFetch.post("/api/submit/meeting",obj, authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const submitProjectThunk = async(obj, thunkAPI) => {
  try{
      const resp = await customFetch.post("/api/submit/project",obj, authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const submitScheduleThunk = async(obj, thunkAPI) => {
  try{
      const resp = await customFetch.post("/api/submit/schedule",obj, authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const getMeetingsThunk = async(_, thunkAPI) => {
  try{
      const resp = await customFetch.get("/api/submit/getMeetings", authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const getSchedulesThunk = async(_, thunkAPI) => {
  try{
      const resp = await customFetch.get("/api/submit/getSchedules", authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const getAllProjectsThunk = async(_, thunkAPI) => {
  try{
      const resp = await customFetch.get("/api/submit/getAllProjects", authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const getAllMeetingsThunk = async(_, thunkAPI) => {
  try{
      const resp = await customFetch.get("/api/submit/getAllMeetings", authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const getAllSchedulesThunk = async(_, thunkAPI) => {
  try{
      const resp = await customFetch.get("/api/submit/getAllSchedules", authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const delScheduleThunk = async(obj, thunkAPI) => {
  try{
      const resp = await customFetch.post("/api/submit/delSchedule",obj, authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const delMeetingThunk = async(obj, thunkAPI) => {
  try{
      const resp = await customFetch.post("/api/submit/delMeeting",obj, authHeader(thunkAPI));
      return resp.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}