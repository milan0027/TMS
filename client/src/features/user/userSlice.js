import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  loadUserThunk,
  submitMeetingThunk,
  submitProjectThunk,
  submitScheduleThunk,
  getMeetingsThunk,
  getSchedulesThunk,
  getAllProjectsThunk,
  getAllMeetingsThunk,
  getAllSchedulesThunk,
  delMeetingThunk,
  delScheduleThunk,
} from "./userThunk";
import { toast } from "react-toastify";

import {
  addTokenToLocalStorage,
  addTypeToLocalStorage,
  getTokenFromLocalStorage,
  getTypeFromLocalStorage,
  removeTokenFromLocalStorage,
  removeTypeFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  user: null,
  type: getTypeFromLocalStorage(),
  token: getTokenFromLocalStorage(),
  meetings: null,
  schedules: null,
  allProjects: null,
  allMeetings: null,
  allSchedules: null,
  isMLoading: false,
  isSLoading: false,
  isAPLoading: false,
  isAMLoading: false,
  isASLoading: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  registerUserThunk
);
export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);
export const loadUser = createAsyncThunk("user/loadUser", loadUserThunk);
export const submitMeeting = createAsyncThunk(
  "user/submitMeeting",
  submitMeetingThunk
);
export const submitProject = createAsyncThunk(
  "user/submitProject",
  submitProjectThunk
);
export const submitSchedule = createAsyncThunk(
  "user/submitSchedule",
  submitScheduleThunk
);
export const getMeetings = createAsyncThunk(
  "user/getMeetings",
  getMeetingsThunk
);
export const getSchedules = createAsyncThunk(
  "user/getSchedules",
  getSchedulesThunk
);
export const getAllMeetings = createAsyncThunk(
  "user/getAllMeetings",
  getAllMeetingsThunk
);
export const getAllSchedules = createAsyncThunk(
  "user/getAllSchedules",
  getAllSchedulesThunk
);
export const getAllProjects = createAsyncThunk(
  "user/getAllProjects",
  getAllProjectsThunk
);
export const delMeeting = createAsyncThunk("user/delMeeting", delMeetingThunk);
export const delSchedule = createAsyncThunk(
  "user/delSchedule",
  delScheduleThunk
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      removeTypeFromLocalStorage();
      removeTokenFromLocalStorage();
      toast.success("Logout Successfull");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { token, type } = payload;
      state.isLoading = false;
      state.type = type;
      state.token = token;
      addTypeToLocalStorage(type);
      addTokenToLocalStorage(token);
      toast.success(`Registered Succcesfully`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { token, type } = payload;
      state.isLoading = false;
      state.type = type;
      state.token = token;
      addTypeToLocalStorage(type);
      addTokenToLocalStorage(token);
      toast.success(`Logged In Successfully`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loadUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [submitMeeting.pending]: (state) => {
      toast.success("Submitted");
    },
    [submitMeeting.fulfilled]: (state, { payload }) => {
      const { msg } = payload;
      toast.success(msg);
    },
    [submitMeeting.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [submitProject.pending]: (state) => {
      toast.success("Submitted");
    },
    [submitProject.fulfilled]: (state, { payload }) => {
      const { msg } = payload;
      toast.success(msg);
    },
    [submitProject.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [submitSchedule.pending]: (state) => {
      toast.success("Submitted");
    },
    [submitSchedule.fulfilled]: (state, { payload }) => {
      const { msg } = payload;
      toast.success(msg);
    },
    [submitSchedule.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [getMeetings.pending]: (state) => {
      state.isMLoading = true;
    },
    [getMeetings.fulfilled]: (state, { payload }) => {
      const { meetings } = payload;
      state.meetings = meetings;
      state.isMLoading = false;
    },
    [getMeetings.rejected]: (state, { payload }) => {
      toast.error(payload);
      state.isMLoading = false;
    },
    [getSchedules.pending]: (state) => {
      state.isSLoading = true;
    },
    [getSchedules.fulfilled]: (state, { payload }) => {
      const { schedules } = payload;
      state.schedules = schedules;
      state.isSLoading = false;
    },
    [getSchedules.rejected]: (state, { payload }) => {
      toast.error(payload);
      state.isSLoading = false;
    },
    [getAllMeetings.pending]: (state) => {
      state.isAMLoading = true;
    },
    [getAllMeetings.fulfilled]: (state, { payload }) => {
      const { allMeetings } = payload;
      state.allMeetings = allMeetings;
      state.isAMLoading = false;
    },
    [getAllMeetings.rejected]: (state, { payload }) => {
      toast.error(payload);
      state.isAMLoading = false;
    },
    [getAllSchedules.pending]: (state) => {
      state.isASLoading = true;
    },
    [getAllSchedules.fulfilled]: (state, { payload }) => {
      const { allSchedules } = payload;
      state.allSchedules = allSchedules;
      state.isASLoading = false;
    },
    [getAllSchedules.rejected]: (state, { payload }) => {
      toast.error(payload);
      state.isASLoading = false;
    },
    [getAllProjects.pending]: (state) => {
      state.isAPLoading = true;
    },
    [getAllProjects.fulfilled]: (state, { payload }) => {
      const { allProjects } = payload;
      state.allProjects = allProjects;
      state.isAPLoading = false;
    },
    [getAllProjects.rejected]: (state, { payload }) => {
      toast.error(payload);
      state.isAPLoading = false;
    },
    [delMeeting.pending]: (state) => {
      toast.success("Delete Request Sent");
    },
    [delMeeting.fulfilled]: (state, { payload }) => {
      const { common } = payload;
      if (state.meetings) {
        state.meetings = state.meetings.filter(
          (item) => item.common !== common
        );
      }

      if (state.allMeetings) {
        state.allMeetings = state.allMeetings.filter(
          (item) => item.common !== common
        );
      }
      if (state.schedules) {
        state.schedules = state.schedules.filter(
          (item) => item.common !== common
        );
      }

      if (state.allSchedules) {
        state.allSchedules = state.allSchedules.filter(
          (item) => item.common !== common
        );
      }
    },
    [delMeeting.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [delSchedule.pending]: (state) => {
      toast.success("Delete Request Sent");
    },
    [delSchedule.fulfilled]: (state, { payload }) => {
      const { common } = payload;
      if (state.meetings) {
        state.meetings = state.meetings.filter(
          (item) => item.common !== common
        );
      }

      if (state.allMeetings) {
        state.allMeetings = state.allMeetings.filter(
          (item) => item.common !== common
        );
      }
      if (state.schedules) {
        state.schedules = state.schedules.filter(
          (item) => item.common !== common
        );
      }

      if (state.allSchedules) {
        state.allSchedules = state.allSchedules.filter(
          (item) => item.common !== common
        );
      }
    },
    [delSchedule.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
