import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import AppContainer from "./App.tsx";

import "./index.css";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
