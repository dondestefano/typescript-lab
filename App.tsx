import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';

type RootStackParamList = {
  Article: { itemId: number };
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

interface ListItem {
  id: number,
  title: string,
  imageUrl: string,
  price: number
  onSale: boolean
}

const ListScreen = ({navigation}: Props) => {

  const fetchList: () => ListItem[] = () => {
    let url: string = "https://fakestoreapi.com/products"
    let dataResults: ListItem[] = [];
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      json.forEach((item: any) => {
        let isOnSale: boolean = false

        if (item.price > 50) {
          console.log(item.price)
          isOnSale = true
          item.price = Math.round(item.price * 0.8)
        } else { isOnSale = false}

        let result: ListItem = { 
          id: item.id, 
          title: item.title, 
          imageUrl: item.image,
          price: item.price,
          onSale: isOnSale };

        dataResults.push(result);
      });
      setList(dataResults)
    });
    return list
  }

  const [list, setList] = useState<ListItem[]>(() => fetchList());

  return(
    <FlatList
    data={list}
    renderItem={({ item }) =>
    <TouchableOpacity  onPress={() => {
      navigation.navigate('Article', {itemId: item.id})}}>    
      <View style={styles.listItemView}>
      <Image source={{uri: item.imageUrl}} style={{width: "25%", height: "100%"}}/>
      <View style={styles.listItemTextView}>
        <Text style={{fontSize: 18, marginBottom: 12, fontWeight: "bold"}}>{item.title}</Text>
        <Text style={{fontSize: 18, color: item.onSale? "green" : "black"}}>{"$" + item.price}</Text>
      </View>

  </View>
  </TouchableOpacity>
  }
  keyExtractor={(item) => item.title.toString()}/>
  )
}

const ArticleScreen = ({route}: Props) => {
  const itemId: number = route.params.itemId;
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
          initialParams={{ itemId: 0 }}
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

  listItemView: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between"
  },

  listItemTextView: {
    flex: 1,
    flexDirection: "column",
    padding: 10
  }
});
