import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Permission, PermissionState, AssignPermissionData, RolePermissionResponse } from "./permissionTypes";
import { api } from "../../api/axios";
import { AxiosError } from "axios";

export const fetchPermissions = createAsyncThunk<Permission[], void, { rejectValue: string }>(
  "permission/fetchPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/permission/all");
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to load permissions");
    }
  }
);

export const fetchRolePermissions = createAsyncThunk<
  { roleId: number; permissions: string[] },
  number,
  { rejectValue: string }
>(
  "permission/fetchRolePermissions",
  async (roleId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/permission/role/${roleId}`);
      const permissions = res.data.data.map((rp: RolePermissionResponse) => rp.Permission?.name).filter(Boolean);
      return { roleId, permissions };
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to load role permissions");
    }
  }
);

export const assignPermissionToRole = createAsyncThunk<
  { roleId: number; permissionName: string },
  AssignPermissionData,
  { rejectValue: string }
>(
  "permission/assignPermission",
  async ({ roleId, permissionName }, { rejectWithValue }) => {
    try {
      await api.post("/permission/assign", { roleId, permissionName });
      return { roleId, permissionName };
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to assign permission");
    }
  }
);

export const removePermissionFromRole = createAsyncThunk<
  { roleId: number; permissionName: string },
  AssignPermissionData,
  { rejectValue: string }
>(
  "permission/removePermission",
  async ({ roleId, permissionName }, { rejectWithValue }) => {
    try {
      await api.delete("/permission/remove", { data: { roleId, permissionName } });
      return { roleId, permissionName };
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to remove permission");
    }
  }
);

interface ExtendedPermissionState extends PermissionState {
  rolePermissions: Record<number, string[]>;
}

const initialState: ExtendedPermissionState = {
  permissions: [],
  loading: false,
  error: null,
  rolePermissions: {},
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all permissions
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      // Fetch role permissions
      .addCase(fetchRolePermissions.fulfilled, (state, action) => {
        state.rolePermissions[action.payload.roleId] = action.payload.permissions;
      })
      // Assign permission
      .addCase(assignPermissionToRole.fulfilled, (state, action) => {
        const { roleId, permissionName } = action.payload;
        if (!state.rolePermissions[roleId]) {
          state.rolePermissions[roleId] = [];
        }
        if (!state.rolePermissions[roleId].includes(permissionName)) {
          state.rolePermissions[roleId].push(permissionName);
        }
      })
      // Remove permission
      .addCase(removePermissionFromRole.fulfilled, (state, action) => {
        const { roleId, permissionName } = action.payload;
        if (state.rolePermissions[roleId]) {
          state.rolePermissions[roleId] = state.rolePermissions[roleId].filter(
            (p) => p !== permissionName
          );
        }
      });
  },
});

export const { clearError } = permissionSlice.actions;
export default permissionSlice.reducer;