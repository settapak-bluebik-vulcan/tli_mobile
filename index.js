import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { startNetworkLogging } from 'react-native-network-logger';

startNetworkLogging();
AppRegistry.registerComponent(appName, () => App);

