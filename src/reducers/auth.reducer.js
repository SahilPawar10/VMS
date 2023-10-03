import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null, approvalsCount: 0 },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      console.log(user, token, "tokenData");
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
    setProfile: (state, action) => {
      // const { name } = action.payload;
      // state.user = name;
      console.log(action.payload);
    },
    setCount: (state, action) => {
      state.approvalsCount = action.payload;
    },
  },
});

export const { setCredentials, clearToken, setProfile, setCount } =
  authSlice.actions;

// export const selectToken = (state) => state.auth.token;
export const selectProfile = (state) => state.auth.user;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectCount = (state) => state.auth.approvalsCount;

export default authSlice.reducer;
