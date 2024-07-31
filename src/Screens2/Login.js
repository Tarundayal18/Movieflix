import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginTop: 150 }}>Login with your account</Text>

      {/* <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Phone Number"
        maxLength={10}
      /> */}

      <View style={styles.conainer}>
        <CountryPicker
          countryCode={country}
          withFilter
          withFlag
          withCountryNameButton={false}
          withCallingCode
          onSelect={onSelect}
          containerButtonStyle={styles.countryPicker}
        />
        <Text style={{ ...styles.code, color: theme === 'LIGHT' ? 'black' : 'white' }}>{countryCode}</Text>
        <Feather style={styles.dropdown} name="chevron-down" size={23} color="#64748B" />

        <TextInput
          style={{ ...styles.input, color: theme === 'LIGHT' ? 'black' : 'white' }}
          placeholder="Phone Number"
          placeholderTextColor={theme === 'LIGHT' ? "gray" : "lightgray"}
          keyboardType="phone-pad"
          value={number}
          onChangeText={handleInputChange}
          maxLength={10}
          autoComplete='false'
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Password"
        maxLength={30}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
        <Text style={{ alignSelf: 'center', marginTop: 20, color: '  grey', fontWeight: 'bold' }}>Forget Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button1}>
        <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center', fontSize: 17 }}>Sign in</Text>
      </TouchableOpacity>

      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginTop: 150 }}>Dont't have an Account? Sign up</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 23,
    borderRadius: 50,
    height: 55,
    // marginVertical:10,
    marginTop: 45,
    padding: 20
  },
  Button1: {
    height: 60,
    marginHorizontal: 25,
    borderRadius: 10,
    marginTop: 250,
    backgroundColor: '#06309B',
    justifyContent: 'center',
  },
  conainer: {
    borderWidth: 1,
    width: "90%",
    // paddingVertical:20,
    alignSelf: 'center',
    marginTop: 20,
    // backgroundColor:'red',
    flexDirection: 'row',
    height: "12%",
    borderRadius: 10,
    // borderColor: "lightgrey"
  },
  countryPicker: {
    // borderWidth:1,
    width: "130%",
    height: "100%",
    paddingTop: 12,
    paddingLeft: 18,
    // backgroundColor:'red',
    // borderRadius:20
    // right:20,
    paddingRight: 20

  },
  code: {
    paddingTop: 17,
    right: 30
  },
  dropdown: {
    // backgroundColor:'green',
    paddingTop: 16,
    right: 25
  },
})

export default Login