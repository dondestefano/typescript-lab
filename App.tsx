import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet, Text, View, Button } from 'react-native';

type RootStackParamList = {
  Article: { itemId: string };
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

const ListScreen = ({navigation, route}: Props) => {
  
  return(
    <View style={styles.container}>
      <Text>I'm the list</Text>
      <Button
        title="Go to Article"
        onPress={() => {
          navigation.navigate('Article', {itemId: 'Text yo!'})
        }}
      />
    </View>
  )
}

const ArticleScreen = ({route}: Props) => {
  const itemId: string = route.params.itemId;
  return(
    <View style={styles.container}>
      <Text>{itemId}</Text>
    </View>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={"List"}>
        <RootStack.Screen name="List" component={ListScreen} />
        <RootStack.Screen 
          name="Article" 
          component={ArticleScreen} 
          initialParams={{ itemId: "item" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
