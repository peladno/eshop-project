//import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiServices from '../Services/ApiServices';

export const userLogin = createAsyncThunk(
  'auth/login',
  async (values, { rejectWithValue }) => {
    try {
      const response = await ApiServices.loginUser(values);
      const data = response.data;
      //localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.status) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk('auth/register');

export const logOut = () => {};

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload.user;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.success = true;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

//export const { login, register, logout } = authSlice.actions;

/*export const signUp = (values) => {
  return async (dispatch) => {
    try {
      const response = await ApiServices.loginUser(values);
      const { token, user } = response.data;
      dispatch(
        login({
          userId: user,
          token: token,
        })
      );
    } catch (error) {
      throw error;
    }
  };
};*/
//export const signIn = () => {};

export default authSlice.reducer;
