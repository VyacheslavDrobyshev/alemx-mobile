/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
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
import BaseToggle from './src/components/BaseToggle';
import Avatar from './src/components/Avatar';
import CodeTextInput from './src/components/CodeTextInput';
import Badge from './src/components/Badge';
import NumberInput from './src/components/NumberInput';
import CustomScrollView from './src/components/CustomScrollView';
import RangeSlider from './src/components/RangeSlider';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.base1 }}>
      {/* <FilledButton
        // disabled
        title='Test'
        leftIcon='lock'
        rightIcon='lock'
        onPress={() => null}
      /> */}

      {/* <OutlinedButton
        // disabled
        title='Test'
        leftIcon='lock'
        rightIcon='lock'
        onPress={() => null}
      /> */}

      {/* <TextButton
        // disabled
        title='Test'
        leftIcon='lock'
        rightIcon='lock'
        onPress={() => null}
      /> */}

      {/* <SquareButton
        // disabled
        // outline
        icon='lock'
        onPress={() => null}
      /> */}

      {/* <CirqleButton
        // disabled
        icon='lock'
        onPress={() => null}
      /> */}

      {/* <BaseCheckbox
        // disabled
        // error
        isChecked={true}
        onPress={() => null}
      /> */}

      {/* <BaseTextInput
        // disabled
        // error="asdad"
        value="asasdasdsasadd"
        label='Label'
        caption='Caption'
        placeholder="Placeholder"
        leftIcon='lock'
        rightIcon='lock'
        onChangeText={() => {}}
      /> */}

      {/* <BaseToggle
        // disabled
        isEnabled={false}
        label='Label'
        onPress={() => null}
      /> */}

      {/* <Avatar
        source={{ uri: 'https://easydrawingguides.com/wp-content/uploads/2021/05/Aang-Step-10.png' }}
        isActive={true}
      /> */}

      {/* <CodeTextInput
        // disabled
        // error
        value="1"
        onChangeText={() => {}}
      /> */}

      {/* <Badge placeholder="Placeholder" color="red" /> */}

      {/* <NumberInput
        // disabled
        // error='Error text'
        value={1}
        setValue={() => null}
        label="Label"
        caption='Caption'
      /> */}

      {/* <CustomScrollView>
        <View style={{ height: 2_000 }} />
      </CustomScrollView> */}

      <RangeSlider
        // setValue={() => {}}
      />
    </SafeAreaView>
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
