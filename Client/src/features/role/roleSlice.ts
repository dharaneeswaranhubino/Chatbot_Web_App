import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Role, RoleState, CreateRoleData } from "./roleTypes";
import { api } from "../../api/axios";
import { AxiosError } from "axios";

export const fetchRoles = createAsyncThunk<Role[], void, { rejectValue: string }>(
  "role/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/role/all-roles");
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to load roles"
      );
    }
  }
);

export const createRole = createAsyncThunk<Role, CreateRoleData, { rejectValue: string }>(
  "role/createRole",
  async (roleData, { rejectWithValue }) => {
    try {
      const res = await api.post("/role/create-role", roleData);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to create role"
      );
    }
  }
);

export const deleteRole = createAsyncThunk<number, number, { rejectValue: string }>(
  "role/deleteRole",
  async (roleId, { rejectWithValue }) => {
    try {
      await api.delete(`/role/delete-role/${roleId}`);
      return roleId;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete role"
      );
    }
  }
);

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create role";
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete role";
      });
  },
});

export const { clearError } = roleSlice.actions;
export default roleSlice.reducer;