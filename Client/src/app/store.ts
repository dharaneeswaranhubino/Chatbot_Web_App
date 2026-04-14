import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import UserReducer from "../features/user/userSlice";
import roleReducer from "../features/role/roleSlice";
import permissionReducer from "../features/permission/permissionSlice";
import chatReducer from "../features/chatbot/chatbotSlice";
import userDashboardReducer from "../features/userDashboard/userDashboardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        user: UserReducer,
        role: roleReducer,
        permission: permissionReducer,
        chat: chatReducer,
        userDashboard: userDashboardReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;