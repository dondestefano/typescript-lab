import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Props, RootStackParamList, ArticleScreenNavigationProp, ArticleScreenRouteProp, RootStack} from "./NavigationHelpers"
import {ArticleScreen} from "./ArticleScreen"
import {ListScreen} from "./ListScreen"

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={"List"}>
        <RootStack.Screen 
          name="List" 
          component={ListScreen} />

    <RootStack.Screen 
          name="Article"
          component={ArticleScreen} 
          initialParams={{ itemId: 0, itemTitle: "Article" }}
          options={({ route }) => ({ title: route.params.itemTitle })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}