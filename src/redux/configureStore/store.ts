import { configureStore, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../sagas/rootSaga";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { TypedUseSelectorHook, useSelector } from "react-redux";
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    sagaMiddleware,
  ],
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof persistedReducer>;
sagaMiddleware.run(rootSaga);
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default { store, persistor };
