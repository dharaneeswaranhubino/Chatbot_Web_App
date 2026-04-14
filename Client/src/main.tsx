import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { injectStore } from "./api/axios.ts";
import { initializeAuth } from "./features/auth/authSlice.ts";
import "@fortawesome/fontawesome-free/css/all.min.css";

injectStore(store);
store.dispatch(initializeAuth());

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
);
