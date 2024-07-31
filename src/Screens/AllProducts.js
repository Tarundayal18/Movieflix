// import React, { useEffect, useLayoutEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { View, Text, StyleSheet, Pressable, Image, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { fetchProductsRequest } from '../Redux/actions';

// const AllProducts = () => {
//   const dispatch = useDispatch();
//   const { products: initialProducts } = useRoute().params;
//   const products = useSelector(state => state.products);
//   const loading = useSelector(state => state.loading);
//   const error = useSelector(state => state.error);
//   const navigation = useNavigation();

//   const getCategory = () => {
//     return initialProducts.length ? initialProducts[0].category : 'Category not found';
//   };

//   useEffect(() => {
//     if (!initialProducts.length) {
//       dispatch(fetchProductsRequest());
//     }
//   }, [dispatch, initialProducts]);

//   useLayoutEffect(() => {
//     const category = getCategory();
//     navigation.setOptions({ headerTitle: category });
//   }, [navigation, initialProducts]);

//   const renderProduct = ({ item }) => (
//     <View style={styles.box}>
//       <TouchableOpacity onPress={() => Details(item.id)}>
//         <Image style={styles.image} source={{ uri: item.thumbnail }} />
//       </TouchableOpacity>
//       <Pressable onPress={() => Details(item.id)}>
//         <Text style={{ color: 'white', alignSelf: 'center', width: 150 }}>{item.title}</Text>
//       </Pressable>
//     </View>
//   );

//   const Details = (productId) => {
//     navigation.navigate('Details', { productId });
//   };

//   if (loading) {
//     return <Text style={{ color: 'white' }}>Loading...</Text>;
//   }

//   if (error) {
//     return <Text>Error: {error}</Text>;
//   }

//   return (
//     <SafeAreaView style={{ backgroundColor: 'lightgreen' }}>
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.container}>
//           <FlatList
//             data={initialProducts}
//             renderItem={renderProduct}
//             keyExtractor={item => item.id.toString()}
//             numColumns={2}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#09282B',
//     marginVertical: 20,
//   },
//   box: {
//     flex: 1,
//     margin: 10,
//     alignItems: 'center',
//   },
//   image: {
//     width: 150,
//     height: 150,
//   },
//   scrollView: {
//     backgroundColor: '#091c1c',
//   },
// });

// export default AllProducts;


import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchProductsRequest } from '../Redux/actions';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products: initialProducts } = useRoute().params;
  const products = useSelector(state => state.products);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const navigation = useNavigation();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts.slice(0, 5));
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getCategory = () => {
    return initialProducts.length ? initialProducts[0].category : 'Category not found';
  };

  useEffect(() => {
    if (!initialProducts.length) {
      dispatch(fetchProductsRequest());
    }
  }, [dispatch, initialProducts]);

  useLayoutEffect(() => {
    const category = getCategory();
    navigation.setOptions({ headerTitle: category });
  }, [navigation, initialProducts]);

  useEffect(() => {
    setDisplayedProducts(initialProducts.slice(0, currentPage * 5));
  }, [currentPage, initialProducts]);

  const loadMore = () => {
    if (!isLoadingMore && displayedProducts.length < initialProducts.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setCurrentPage(prevPage => prevPage + 1);
        setIsLoadingMore(false);
      }, 1500); 
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.box}>
      <TouchableOpacity onPress={() => Details(item.id)}>
        <Image style={styles.image} source={{ uri: item.thumbnail }} />
      </TouchableOpacity>
      <Pressable onPress={() => Details(item.id)}>
        <Text style={{ color: 'white', alignSelf: 'center', width: 150 }}>{item.title}</Text>
      </Pressable>
    </View>
  );

  const Details = (productId) => {
    navigation.navigate('Details', { productId });
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
          <FlatList
            data={displayedProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
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
  box: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  scrollView: {
    backgroundColor: '#091c1c',
  },
});

export default AllProducts;