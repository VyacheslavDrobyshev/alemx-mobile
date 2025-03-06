import { AccountValueButtonsList } from '@app/features/wallet/screens/Wallet/components/AccountValue/types.ts';
import { AppIcon } from '@app/components';
import { MainRoute } from '@app/features/rootNavigation/main/constants.ts';

export const accountValueButtonsList: AccountValueButtonsList[] = [
  {
    button: <AppIcon name={'ArrowDown'} color={'white'} />,
    title: 'Receive',
    route: MainRoute.Deposit,
  },
  {
    button: <AppIcon name={'ExternalLink'} color={'white'} />,
    title: 'Send',
    route: MainRoute.Withdraw,
  },
  {
    button: <AppIcon name={'Money'} color={'white'} />,
    title: 'Buy',
    route: MainRoute.WithdrawDetails,
  },
  {
    button: <AppIcon name={'Switch'} color={'white'} />,
    title: 'Exchange',
    route: MainRoute.DepositDetails,
  },
  {
    button: <AppIcon name={'List'} color={'white'} />,
    title: 'History',
    route: MainRoute.History,
  },
];
