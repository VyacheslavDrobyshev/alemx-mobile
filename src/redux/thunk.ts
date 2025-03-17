import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetThunkAPI,
  RejectWithValue,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
} from '@reduxjs/toolkit/dist/createAsyncThunk';

import type { ThunkApiConfig } from './types';

export const createAppThunk = <Returned, ThunkArg = void>(
  name: string,
  cb: (
    arg: ThunkArg,
    config: GetThunkAPI<ThunkApiConfig>,
  ) => // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | Promise<Returned | RejectWithValue<string, unknown>>
    | Returned
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | RejectWithValue<string, unknown>,
) => createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(name, cb);
