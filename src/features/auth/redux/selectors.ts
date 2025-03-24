import { CoreReduxState } from '@app/redux/types';

export const selectAccessToken = ({ auth }: CoreReduxState) => auth.accessToken;
export const selectIsLoadingAuth = ({ auth }: CoreReduxState) => auth.isLoading;
export const selectUserInfo = ({ auth }: CoreReduxState) => auth.userInfo;
