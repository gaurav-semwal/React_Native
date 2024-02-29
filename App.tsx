import React from "react";
import AppNavigator from "./src/navigationRoutes";
import { Provider } from "react-redux";
import store from "./src/redux/configureStore/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <AppNavigator />
        <Toast/>
      </PersistGate>
    </Provider>
  );
};
export default App;
