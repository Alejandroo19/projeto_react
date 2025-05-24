import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const loginThunk = createAsyncThunk<
  string,
  { email: string; password: string }
>(
  'auth/login',
  async (creds, thunkAPI) => {
    const resp = await api.post<{ token: string }>('/login', creds)
    return resp.data.token
  }
)

interface AuthState {
  token: string | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.status = 'loading'
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'idle'
          state.token = action.payload
        }
      )
      .addCase(loginThunk.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
