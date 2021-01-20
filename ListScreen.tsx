import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import {Props} from './NavigationHelpers'
import {styles} from "./Styles"
export {ListScreen}

interface ListItem {
    id: number,
    title: string,
    imageUrl: string,
    price: number,
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