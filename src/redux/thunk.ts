import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';

import type { ThunkApiConfig } from './types';

export const createAppThunk = <Returned, ThunkArg = void>(
  name: string,
  cb: (
    arg: ThunkArg,
    config: GetThunkAPI<ThunkApiConfig>,
  ) =>
    | Promise<
        Returned | ReturnType<GetThunkAPI<ThunkApiConfig>['rejectWithValue']>
      >
    | Returned
    | ReturnType<GetThunkAPI<ThunkApiConfig>['rejectWithValue']>,
) => createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(name, cb);
