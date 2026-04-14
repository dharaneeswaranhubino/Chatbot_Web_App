import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import type { UserDashboardData } from "./userDashboardTypes";
import { AxiosError } from "axios";

interface UserDashboardState {
    data: UserDashboardData | null;
    loading: boolean;
    error: string | null;
}

export const fetchUserDashboard = createAsyncThunk<
    UserDashboardData,
    void,
    { rejectValue: string }
>("userDashboard/fetch", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/userDashboard/user_dashboard");
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(error.response?.data?.message || "Failed to load dashboard");
    }
});


const initialState: UserDashboardState = {
    data: null,
    loading: false,
    error: null,
};

const userDashboardSlice = createSlice({
    name: "userDashboard",
    initialState,
    reducers: {
        clearUserDashboard: (state) => {
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { clearUserDashboard } = userDashboardSlice.actions;
export default userDashboardSlice.reducer;