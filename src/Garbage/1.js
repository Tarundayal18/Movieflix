// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Pressable, Image, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const Main = () => {
//   const [products1To10, setProducts1To10] = useState([]);
//   const [products11To20, setProducts11To20] = useState([]);
//   const [products21To30, setProducts21To30] = useState([]);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://dummyjson.com/products');
//         const data = await response.json();

//         const products1To10 = data.products.filter(product => product.id >= 1 && product.id <= 10);
//         const products11To20 = data.products.filter(product => product.id >= 11 && product.id <= 20);
//         const products21To30 = data.products.filter(product => product.id >= 21 && product.id <= 30);

//         setProducts1To10(products1To10);
//         setProducts11To20(products11To20);
//         setProducts21To30(products21To30);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const renderProduct = ({ item }) => (
//     <View style={styles.Box}>
//       <TouchableOpacity onPress={() => Details(item.id)}>
//         <Image style={styles.image} source={{ uri: item.thumbnail }} />
//       </TouchableOpacity>
//       <Pressable onPress={() => Details(item.id)}>
//         <Text style={{ color: 'white', left: 2 }}>{item.title}</Text>
//         <Text style={{ color: 'grey', fontSize: 10, left: 2 }}>{item.category}</Text>
//       </Pressable>
//     </View>
//   );

//   const Details = (productId) => {
//     navigation.navigate('Details', { productId });
//   }

//   return (
//     <SafeAreaView style={{backgroundColor:'lightgreen'}}>
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.container}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 13 }}>
//             <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Popular</Text>
//             <Pressable>
//               <Text style={styles.all}>See all
//                 <AntDesign name="right" size={23} color={'grey'} />
//               </Text>
//             </Pressable>
//           </View>
//           <FlatList
//             data={products1To10}
//             renderItem={renderProduct}
//             keyExtractor={item => item.id.toString()}
//             horizontal={true}
//           />

//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 13 }}>
//             <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Furniture</Text>
//             <Pressable>
//               <Text style={styles.all}>See all
//                 <AntDesign name="right" size={23} color={'grey'} />
//               </Text>
//             </Pressable>
//           </View>
//           <FlatList
//             data={products11To20}
//             renderItem={renderProduct}
//             keyExtractor={item => item.id.toString()}
//             horizontal={true}
//           />

//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 13 }}>
//             <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Food</Text>
//             <Pressable>
//               <Text style={styles.all}>See all
//                 <AntDesign name="right" size={23} color={'grey'} />
//               </Text>
//             </Pressable>
//           </View>
//           <FlatList
//             data={products21To30}
//             renderItem={renderProduct}
//             keyExtractor={item => item.id.toString()}
//             horizontal={true}
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
//   all: {
//     color: 'grey',
//     alignSelf: 'center',
//     marginRight: 20,
//     bottom: 3
//   },
//   Box: {
//     marginLeft: 10,
//     marginVertical: 23,
//     width: 120,
//   },
//   image: {
//     width: 120,
//     height: 180
//   },
//   scrollView: {
//     backgroundColor: '#091c1c',
//   },
// });

// export default Main;
