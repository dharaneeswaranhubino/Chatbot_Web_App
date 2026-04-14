import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AssignRoleData, UpdateUserData, User, UserState } from "./userTypes";
import { api } from "../../api/axios";
import { AxiosError } from "axios";

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    "user/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/user/all-users");
            return res.data.data;

        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>
            return rejectWithValue(
                error.response?.data?.message || "Faild to load UserManagement"
            )
        }
    }
)

export const deleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            await api.delete(`/user/users/${userId}`);
            return userId;

        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>
            return rejectWithValue(
                error.response?.data?.message || "Faild to delete user"
            )
        }
    }
)

export const updateUser = createAsyncThunk<User, UpdateUserData, { rejectValue: string }>(
    "user/updateUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.put(`/user/users/${userData.id}`, userData);
            return res.data.data;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(
                error.response?.data?.message || "Failed to update user"
            );
        }
    }
)

export const assignRole = createAsyncThunk<{ userId: number, roleName: string }, AssignRoleData, { rejectValue: string }>(
    "user/assign-role",
    async ({ userId, roleName }, { rejectWithValue }) => {
        try {
            await api.post("/user/assign-role", { userId, roleName });
            return { userId, roleName };
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(
                error.response?.data?.message || "Failed to assign role"
            );
        }
    }
)

export const removeRole = createAsyncThunk<{ userId: number; roleName: string }, AssignRoleData, { rejectValue: string }>(
    "user/remove-role",
    async ({ userId, roleName }, { rejectWithValue }) => {
        try {
            await api.delete("/user/remove-role", { data: { userId, roleName } });
            return { userId, roleName };
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove role"
            );
        }
    }
);

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete user";
            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id == action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update user"
            })

            .addCase(assignRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignRole.fulfilled, (state, action) => {
                state.loading = false;
                const user = state.users.find((user) => user.id === action.payload.userId);
                if (user && !user.role.includes(action.payload.roleName)) {
                    user.role.push(action.payload.roleName);
                }
            })
            .addCase(assignRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to assign role"
            })

            .addCase(removeRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeRole.fulfilled, (state, action) => {
                state.loading = false;
                const user = state.users.find((user) => user.id === action.payload.userId);
                if (user) {
                    user.role = user.role.filter((role) => role !== action.payload.roleName);
                }
            })
            .addCase(removeRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to remove role";
            });
    }
})

export const { clearError } = userSlice.actions;
export default userSlice.reducer;