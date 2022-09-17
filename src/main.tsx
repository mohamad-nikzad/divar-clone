import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import "./assets/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
// import { ReactQueryDevtools } from "react-query/devtools";
import { ManagedModal } from "./container";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer
          position="top-left"
          autoClose={3000}
          theme="colored"
          newestOnTop={false}
          limit={2}
          rtl
          closeOnClick
          pauseOnHover
          pauseOnFocusLoss
          draggable
        />
        <ManagedModal />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
