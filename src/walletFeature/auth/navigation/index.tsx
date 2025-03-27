import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { SignUpScreen, SignInScreen } from '@app/walletFeature/auth';

import { noHeaderOptions } from '../../rootNavigation/constants';

import { UnauthorizedParamList } from './types';
import { UnauthorizedRoute } from './constants';

const Unauthorized = createNativeStackNavigator<UnauthorizedParamList>();

export const UnauthorizedNavigator: FC = () => (
  <Unauthorized.Navigator initialRouteName={UnauthorizedRoute.SignIn}>
    <Unauthorized.Group screenOptions={noHeaderOptions}>
      <Unauthorized.Screen
        name={UnauthorizedRoute.SignIn}
        component={SignInScreen}
      />
      <Unauthorized.Screen
        name={UnauthorizedRoute.SignUp}
        component={SignUpScreen}
      />
    </Unauthorized.Group>
  </Unauthorized.Navigator>
);
