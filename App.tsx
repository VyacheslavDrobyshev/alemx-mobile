/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Icon from './src/components/Icon';
import FilledButton from './src/components/FilledButton';
import OutlinedButton from './src/components/OutlinedButton';
import TextButton from './src/components/TextButton';
import SquareButton from './src/components/SquareButton';
import CirqleButton from './src/components/CirqleButton';
import BaseCheckbox from './src/components/BaseCheckbox';
import COLORS from './src/styles/colors';
import BaseTextInput from './src/components/BaseTextInput';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

  return (
    <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 20, backgroundColor: COLORS.base1 }}>
      <FilledButton
        // disabled
        title='Test'
        leftIcon='lock'
        rightIcon='lock'
        onPress={() => null}
      />

      <OutlinedButton
        // disabled
        title='Test'
        leftIcon='lock'
        rightIcon='lock'
        onPress={() => null}
      />

      <TextButton
        // disabled
        title='Test'
        leftIcon='lock'
        rightIcon='lock'
        onPress={() => null}
      />

      <SquareButton
        // disabled
        // outline
        icon='lock'
        onPress={() => null}
      />

      <CirqleButton
        // disabled
        icon='lock'
        onPress={() => null}
      />

      <BaseCheckbox
        // disabled
        // error
        isChecked={false}
        onPress={() => null}
      />

      <BaseTextInput
        // disabled
        // error="asdad"
        value="asasdasdsasadd"
        label='Label'
        caption='Caption'
        placeholder="Placeholder"
        leftIcon='lock'
        rightIcon='lock'
        onChangeText={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
