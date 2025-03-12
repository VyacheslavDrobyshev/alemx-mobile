import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetThunkAPI,
  RejectWithValue,
  // @ts-ignore
} from '@reduxjs/toolkit/dist/createAsyncThunk';

import type { ThunkApiConfig } from './types';

export const createAppThunk = <Returned, ThunkArg = void>(
  name: string,
  cb: (
    arg: ThunkArg,
    config: GetThunkAPI<ThunkApiConfig>,
  ) =>
    | Promise<Returned | RejectWithValue<string, unknown>>
    | Returned
    | RejectWithValue<string, unknown>,
) => {
  return createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(name, cb);
};
