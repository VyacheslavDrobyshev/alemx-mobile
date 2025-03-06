import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { SignUpScreen, SignInScreen } from '@app/features/auth';

import { noHeaderOptions } from '../constants';

import { UnauthorizedParamList } from './types';
import { UnauthorizedRoute } from './constants';

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
