import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  Image
} from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await res.json();
      setUsers(users);
    };
    getUser();
  }, []);

  const renderItem = ({ item }) => (

    <Pressable onPress={() => {
      Alert.alert(item.name);
    }}>
      <View style={styles.item}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  );
  
  return (
    <View style={styles.container}>
      <Header title="ユーザ一覧" />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          ></View>
        )}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#88cb7f',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 8,
  },
});
