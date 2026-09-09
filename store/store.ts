import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UsuarioState = {
  email: string;
  logado: boolean;
};

const initialState: UsuarioState = {
  email: "",
  logado: false,
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.logado = true;
    },

    logout: (state) => {
      state.email = "";
      state.logado = false;
    },
  },
});

export const { login, logout } = usuarioSlice.actions;

export const store = configureStore({
  reducer: {
    usuario: usuarioSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;