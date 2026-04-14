import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import type { DashboardSummary, DashboardState } from "./dashboardTypes";

// createAsyncThunk<
//   ReturnType,
//   ArgumentType,
//   ThunkConfig
// >   syntax = new learn
export const fetchDashboardSummary = createAsyncThunk<DashboardSummary, void, { rejectValue: string }>(
    "dashboard/fetchSummary",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/user/dashboard-summary");
            return res.data.data;

        } catch (err: unknown) {
            const error = err as import("axios").AxiosError<{ message: string }>;
            return rejectWithValue(
                error.response?.data?.message || "Faild to load Dashboard"
            )
        }

    }
)

const initialState: DashboardState = {
    summary: null,
    loading: false,
    error: null,
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.summary = action.payload;
                
            })
            .addCase(fetchDashboardSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "something went wrong";
            })
    }

})
export default dashboardSlice.reducer;