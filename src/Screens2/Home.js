import { View, Text, Button, StyleSheet, TouchableOpacity, Image , Linking } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/1.png')} />
      {/* <Image style={styles.image} source={require('../assets/2.png')} /> */}
      {/* <Image style={styles.image} source={require('../assets/3.png')} /> */}

      <TouchableOpacity onPress={() => Linking.openURL('https://shopspot.app/how-it-work/')} style={{flexDirection:'row',alignSelf: 'flex-end', marginRight: 20, marginTop: 40 ,  }}>
        <AntDesign name="play" size={18} color={'skyblue'} style={{marginRight:5, top:2}}/>
        <Text style={{ color: 'black', fontSize: 15}}>How it Works</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity style={styles.Button}>
        <Image style={{width:28, height:28 , alignSelf:'center', marginRight:10}} source={require('../assets/google.png')} />
        <Text style={{color:'black', fontWeight:'bold', alignSelf:'center', justifyContent:'center', fontSize:17}}>Login With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button1}>
        <Text style={{color:'white', fontWeight:'bold', alignSelf:'center', justifyContent:'center', fontSize:17}}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate('Login')}>
        <Text style={{color:'white', fontWeight:'bold', alignSelf:'center', justifyContent:'center', fontSize:17}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 500,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
    // resizeMode: 'contain',
  },
  Button:{
    flexDirection:'row',
    borderColor:'lightgrey',
    borderWidth:1,
    height:60,
    marginHorizontal:25,
    borderRadius:10,
    marginVertical:7,
    justifyContent:'center'
  },
  Button1:{
    height:60,
    marginHorizontal:25,
    borderRadius:10,
    marginVertical:7,
    backgroundColor:'#06309B',
    justifyContent:'center'
  },
  Button2:{
    height:60,
    marginHorizontal:25,
    borderRadius:10,
    marginVertical:7,
    backgroundColor:'#F6550F',
    justifyContent:'center'
  }
})

export default Home