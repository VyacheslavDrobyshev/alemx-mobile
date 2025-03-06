import Reactotron from 'reactotron-react-native';
import AsyncStorage from 'react-native-encrypted-storage';
import { reactotronRedux } from 'reactotron-redux';

import { name as appName } from '../app.json';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: appName,
  })
  .use(reactotronRedux())
  .useReactNative()
  .connect();

export default reactotron;
