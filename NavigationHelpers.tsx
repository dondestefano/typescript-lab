import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
export {Props, RootStackParamList, ArticleScreenNavigationProp, ArticleScreenRouteProp, RootStack}

type RootStackParamList = {
    Article: { itemId: number, itemTitle: string };
    List: undefined
  };
  
  const RootStack = createStackNavigator<RootStackParamList>();
  
  type ArticleScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Article'
  >;
  
  type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;
  
  type Props = {
    navigation: ArticleScreenNavigationProp;
    route: ArticleScreenRouteProp
  };