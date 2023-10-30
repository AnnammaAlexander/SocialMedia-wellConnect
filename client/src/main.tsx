
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
 
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/App/store";
import { PersistGate } from "redux-persist/lib/integration/react";
 
ReactDOM.createRoot(document.getElementById("root")!).render(
<Provider store={store}>
 <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
  </PersistGate> 
</Provider>
);