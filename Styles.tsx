import { StyleSheet } from 'react-native';
export {styles}

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
  