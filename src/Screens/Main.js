import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { fetchProductsRequest } from '../Redux/actions';

const Main = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const navigation = useNavigation();

  const getCategoryById = (id) => {
    const product = products.find(item => item.id === id);
    return product ? product.category : 'Category not found';
  };

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const renderProduct = ({ item }) => (
    <View style={styles.Box}>
      <TouchableOpacity onPress={() => Details(item.id)}>
        <Image style={styles.image} source={{ uri: item.thumbnail }} />
      </TouchableOpacity>
      <Pressable onPress={() => Details(item.id)}>
        <Text style={{ color: 'white', left: 2 }}>{item.title}</Text>
        <Text style={{ color: 'grey', fontSize: 10, left: 2 }}>{item.category}</Text>
      </Pressable>
    </View>
  );

  const Details = (productId) => {
    navigation.navigate('Details', { productId });
  };

  const AllProducts = (productSubset) => {
    navigation.navigate('AllProducts', { products: productSubset });
  };

  if (loading) {
    return <Text style={{ color: 'white' }}>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'lightgreen' }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 13 }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>{getCategoryById(products[0]?.id)}</Text>
            <Pressable onPress={() => AllProducts(products.slice(0, 10))}>
              <Text style={styles.all}>See all
                <AntDesign name="right" size={20} color={'grey'} />
              </Text>
            </Pressable>
          </View>
          <FlatList
            data={products.slice(0, 10)}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 13 }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>{getCategoryById(products[11]?.id)}</Text>
            <Pressable onPress={() => AllProducts(products.slice(10, 15))}>
              <Text style={styles.all}>See all
                <AntDesign name="right" size={20} color={'grey'} />
              </Text>
            </Pressable>
          </View>
          <FlatList
            data={products.slice(10, 15)}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 13 }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>{getCategoryById(products[21]?.id)}</Text>
            <Pressable onPress={() => AllProducts(products.slice(16, 30))}>
              <Text style={styles.all}>See all
                <AntDesign name="right" size={20} color={'grey'} />
              </Text>
            </Pressable>
          </View>
          <FlatList
            data={products.slice(16, 30)}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#09282B',
    marginVertical: 20,
  },
  all: {
    color: 'grey',
    alignSelf: 'center',
    marginRight: 20,
    bottom: 3,
    // backgroundColor:'red',
    padding:5
  },
  Box: {
    marginLeft: 10,
    marginVertical: 23,
    width: 120,
  },
  image: {
    width: 120,
    height: 180
  },
  scrollView: {
    backgroundColor: '#091c1c',
  },
});

export default Main;

