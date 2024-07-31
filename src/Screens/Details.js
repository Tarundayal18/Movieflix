import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, FlatList, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailsRequest } from '../Redux/actions'; 

const { width } = Dimensions.get('window');

const Details = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRoute();
  const { productId } = route.params;
  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchProductDetailsRequest(productId));
  }, [productId, dispatch]);





  const handleImageChange = (index) => {
    setActiveIndex(index);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={16}
          color={i <= rating ? 'gold' : 'grey'}
          style={styles.star}
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };





  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );

    
  }

  if (!productDetails) {
    return (
      <View style={styles.container}>
        <Text>No product details available</Text>
      </View>
    );
  }

  const renderImageItem = ({ item }) => (
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
      <Image style={styles.image} source={{ uri: item }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={productDetails.images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderImageItem({ item })}
          onScroll={(event) => {
            const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            handleImageChange(slideIndex);
          }}
        />
        <View style={styles.dotsContainer}>
          {productDetails.images.map((item, index) => (
            <View key={index} style={[styles.dot, index === activeIndex && styles.activeDot]} />
          ))}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{productDetails.title}</Text>
          <Text style={styles.price}>Price: ${productDetails.price}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={styles.discount}>Discount: {productDetails.discountPercentage}%</Text>
          <Text style={styles.stock}>Available Stocks: {productDetails.stock}</Text>
          </View>
          {/* <Text style={styles.category}>{productDetails.category}</Text> */}
          <Text style={{fontSize: 22, color:'black', marginTop:25}}>Product Detail</Text>
          <Text style={styles.description}>{productDetails.description}</Text>
        </View>
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
          {productDetails.reviews.map((review, index) => (
            <View key={index} style={styles.review}>
              {renderStars(review.rating)}
              <Text style={styles.comment}>{review.comment}</Text>
              <Text style={styles.reviewer}>Reviewer: {review.reviewerName} ({review.reviewerEmail})</Text>
              <Text style={styles.date}>Date: {review.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <ImageViewer
          imageUrls={productDetails.images.map((uri) => ({ url: uri }))}
          index={activeIndex}
          onCancel={() => setIsModalVisible(false)}
          enableSwipeDown={true}
          saveToLocalByLongPress={false}
          style={{ flex: 1 }}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: 300,
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'grey',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'green',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'grey',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  discount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
  },
  stock: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
  },
  reviewsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
  reviewsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    alignSelf: 'center',
  },
  review: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  star: {
    marginRight: 5,
  },
  comment: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  reviewer: {
    fontSize: 14,
    color: 'grey',
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
});

export default Details;
