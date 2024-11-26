import { UnAuthScreens } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigations/root-navigation';

const useViewModel = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPressDevtools = () => {
    navigation.navigate(UnAuthScreens.DEVTOOLS);
  };

  return { onPressDevtools };
};

export default useViewModel;
