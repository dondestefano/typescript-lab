import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet, Text, View, SafeAreaView, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type RootStackParamList = {
  Article: { itemId: number, itemTitle: string };
  List: {}
};

const RootStack = createStackNavigator<RootStackParamList>();

type ArticleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Article'
>;

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'List'
>;

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;
type ListScreenRouteProp = RouteProp<RootStackParamList, "List">;

type ArticleProps = {
  navigation: ArticleScreenNavigationProp;
  route: ArticleScreenRouteProp;
};

type ListProps = {
  navigation: ListScreenNavigationProp;
  route: ListScreenRouteProp;
};

interface ListItem {
  id: number,
  title: string,
  imageUrl: string,
  price: number,
  onSale: boolean
}

interface ArticleScreenItem {
  id: number,
  title: string,
  description: string,
  category: string,
  imageUrl: string,
  price: number,
  onSale: boolean
}

const ListScreen = ({navigation}: ListProps) => {

  const fetchList: () => ListItem[] = () => {
    let url: string = "https://fakestoreapi.com/products"
    let dataResults: ListItem[] = [];
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      json.forEach((item: any) => {
        let isOnSale: boolean = false

        if (item.price > 50) {
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
      navigation.navigate('Article', {itemId: item.id, itemTitle: item.title})}}>    
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

const ArticleScreen = ({route}: ArticleProps) => {

  const fetchArticle: () => ArticleScreenItem | null = () => {

    let url: string = `https://fakestoreapi.com/products/${route.params.itemId}`
    fetch(url)
    .then((response) => response.json())
    .then((json) => {

        let isOnSale: boolean = false

        if (json.price > 50) {
          isOnSale = true
          json.price = Math.round(json.price * 0.8)
        } else { isOnSale = false}

        let result: ArticleScreenItem = { 
          id: json.id,
          title: json.title,
          description: json.description,
          category: json.category,
          imageUrl: json.image,
          price: json.price,
          onSale: isOnSale };

          setArticle(result)

      });
    return article
  }

  const [article, setArticle] = useState<ArticleScreenItem | null>(() => fetchArticle());

  return(
    <SafeAreaView style={{...styles.container, padding:12}}>
      <Image source={{uri: article?.imageUrl}} style={{width: "60%", height: 300}}/>
      <View style={styles.listItemTextView}>
        <Text style={{fontSize: 18, fontWeight: "bold", marginBottom:12}}>{article?.title}</Text>
        <Text style={{fontSize: 18, color: article?.onSale? "green" : "black", marginBottom:12 }}>$ {article?.price}</Text>
        <Text style={{fontWeight: "bold"}}>Description:</Text>
        <Text style={{marginBottom:12}}>{article?.description}</Text>
        <Text style={{fontSize: 12, color: "grey" , marginBottom:12}} >Category: {article?.category}</Text>
      </View>
      <Button title="Add to cart" onPress={() => {console.log("Added to cart")}} />
    </SafeAreaView>
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
          initialParams={{ itemId: 0, itemTitle: "Article" }}
          options={({ route }) => ({ title: route.params.itemTitle })}
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
