import { CoreReduxState } from '@app/walletFeature/wallet/common/redux/types';

export const selectAccessToken = ({ auth }: CoreReduxState) => auth.accessToken;
export const selectIsLoadingAuth = ({ auth }: CoreReduxState) => auth.isLoading;
