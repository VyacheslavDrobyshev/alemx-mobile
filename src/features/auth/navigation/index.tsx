import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { SignUpScreen, SignInScreen } from '@app/features/auth';

import { noHeaderOptions } from '../../rootNavigation/constants.ts';

import { UnauthorizedParamList } from './types.ts';
import { UnauthorizedRoute } from './constants.ts';

const Unauthorized = createNativeStackNavigator<UnauthorizedParamList>();

export const UnauthorizedNavigator: FC = () => {
  return (
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
};
