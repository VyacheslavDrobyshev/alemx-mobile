import {
  AccountValueButtonsId,
  AccountValueButtonsList,
} from '@app/features/wallet/screens/Wallet/components/AccountValue/types.ts';
import { AppIcon } from '@app/components';
import { WalletRoute } from '@app/features/wallet/navigation/constants.ts';

export const accountValueButtonsList: AccountValueButtonsList[] = [
  {
    button: <AppIcon name={'ArrowDown'} color={'white'} />,
    title: 'Receive',
    route: WalletRoute.Deposit,
    id: AccountValueButtonsId.Deposit,
  },
  {
    button: <AppIcon name={'ExternalLink'} color={'white'} />,
    title: 'Send',
    route: WalletRoute.Withdraw,
    id: AccountValueButtonsId.Withdraw,
  },
  {
    button: <AppIcon name={'Money'} color={'white'} />,
    title: 'Buy',
    route: WalletRoute.WithdrawDetails,
    id: AccountValueButtonsId.Buy,
  },
  {
    button: <AppIcon name={'Switch'} color={'white'} />,
    title: 'Exchange',
    route: WalletRoute.DepositDetails,
    id: AccountValueButtonsId.Swap,
  },
  {
    button: <AppIcon name={'List'} color={'white'} />,
    title: 'History',
    route: WalletRoute.History,
    id: AccountValueButtonsId.History,
  },
];
