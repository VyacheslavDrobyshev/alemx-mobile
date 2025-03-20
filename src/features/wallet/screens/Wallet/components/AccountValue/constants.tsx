import {
  AccountValueButtonsId,
  AccountValueButtonsList,
} from '@app/features/wallet/screens/Wallet/components/AccountValue/types';
import { AppIcon } from '@app/components';
import { WalletRoute } from '@app/features/wallet/navigation/constants';

export const accountValueButtonsList: AccountValueButtonsList[] = [
  {
    Button: ({ color }) => <AppIcon name="ArrowDown" color={color} />,
    title: 'Receive',
    route: WalletRoute.Deposit,
    id: AccountValueButtonsId.Deposit,
  },
  {
    Button: ({ color }) => <AppIcon name="ExternalLink" color={color} />,
    title: 'Send',
    route: WalletRoute.Withdraw,
    id: AccountValueButtonsId.Withdraw,
  },
  {
    Button: ({ color }) => <AppIcon name="Money" color={color} />,
    title: 'Buy',
    route: WalletRoute.WithdrawDetails,
    id: AccountValueButtonsId.Buy,
  },
  {
    Button: ({ color }) => <AppIcon name="Switch" color={color} />,
    title: 'Exchange',
    route: WalletRoute.DepositDetails,
    id: AccountValueButtonsId.Swap,
  },
  {
    Button: ({ color }) => <AppIcon name="List" color={color} />,
    title: 'History',
    route: WalletRoute.History,
    id: AccountValueButtonsId.History,
  },
];
