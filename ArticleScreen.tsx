import React, {useState, useEffect} from 'react';
import { Text, View, SafeAreaView, Button, Image } from 'react-native';
import {styles} from "./Styles"
import {Props} from './NavigationHelpers'
export {ArticleScreen}

interface ArticleScreenItem {
    id?: number | null,
    title?: string | null,
    description?: string | null,
    category?: string | null,
    imageUrl: string,
    price?: number | null,
    onSale?: boolean | null
  }
  
  const setDefaultArticle: () => ArticleScreenItem = () => {
      let defaultArticle: ArticleScreenItem = { 
        imageUrl: "notavailable"};
  
      return defaultArticle
  }
  
  const ArticleScreen = ({route}: Props) => {
  
    const fetchArticle: () => ArticleScreenItem = () => {
  
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
  
    const [article, setArticle] = useState<ArticleScreenItem>(() => setDefaultArticle());
  
    useEffect(() => {
      if(article.title === undefined) {
        fetchArticle()
      }
    }, [article]);
  
    return(
      <SafeAreaView style={{...styles.container, padding:12}}>
        <Image source={{uri: article.imageUrl}} style={{width: "60%", height: 300}}/>
        <View style={styles.listItemTextView}>
          <Text style={{fontSize: 18, fontWeight: "bold", marginBottom:12}}>{article.title}</Text>
          <Text style={{fontSize: 18, color: article.onSale? "green" : "black", marginBottom:12 }}>{"$" + article.price}</Text>
          <Text style={{fontWeight: "bold"}}>Description:</Text>
          <Text style={{marginBottom:12}}>{article.description}</Text>
          <Text style={{fontSize: 12, color: "grey" , marginBottom:12}} >{"Category: " + article.category}</Text>
        </View>
        <Button title="Add to cart" onPress={() => {console.log("Added to cart")}} />
      </SafeAreaView>
    )
  }