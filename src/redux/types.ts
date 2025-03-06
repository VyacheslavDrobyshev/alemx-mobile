import { reducers } from './reducers';
import { store } from './store';

export type CoreReduxState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export type ThunkApiConfig<E = string> = {
  rejectValue: E;
  state: CoreReduxState;
  dispatch: AppDispatch;
};
