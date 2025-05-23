// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Para este teste, vamos simular uma chamada que retorna um token fake
export const loginThunk = createAsyncThunk<
  string,                         // tipo do retorno: um token string
  { email: string; password: string } // tipo do argumento
>(
  'auth/login',
  async (creds, thunkAPI) => {
    // aqui você chamaria o API real, mas por ora simulamos:
    await new Promise(res => setTimeout(res, 500))
    return 'fake-token-123'
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
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.status = 'loading'
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'idle'
        state.token = action.payload
      })
      .addCase(loginThunk.rejected, state => {
        state.status = 'failed'
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
