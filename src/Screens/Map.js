// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, PermissionsAndroid, Platform, TouchableOpacity, TextInput } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import MapViewDirections from 'react-native-maps-directions';

// // const GOOGLE_MAPS_APIKEY = 'AIzaSyDzp2nKIp_LsQaxvstKt-P37AWxRyuU_Hc'; // Replace with your Google Maps API key
// const GOOGLE_MAPS_APIKEY = 'AIzaSyBBtthjOC66XiGt_IJyZCBUHniI2AmKxU8'; // Replace with your Google Maps API key

// const Map = () => {
//   const [mLat, setMLat] = useState(0);
//   const [mLong, setMLong] = useState(0);
//   const [hasLocationPermission, setHasLocationPermission] = useState(false);
//   const [destination, setDestination] = useState(''); // State for destination
//   const mapRef = useRef(null); // Reference to the MapView

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//               title: 'Location Permission',
//               message: 'We need access to your location to show maps.',
//               buttonNeutral: 'Ask Me Later',
//               buttonNegative: 'Cancel',
//               buttonPositive: 'OK',
//             },
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             setHasLocationPermission(true);
//           } else {
//             console.log('Location permission denied');
//           }
//         } catch (err) {
//           console.warn(err);
//         }
//       } else {
//         setHasLocationPermission(true);
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   const getLocation = () => {
//     if (!hasLocationPermission) {
//       console.log('No location permission');
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       (position) => {
//         console.log(position);
//         const { latitude, longitude } = position.coords;
//         setMLat(latitude);
//         setMLong(longitude);

//         // Update the map region
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//           }, 1000);
//         }
//       },
//       (error) => {
//         console.log(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TextInput 
//         style={{
//           height: 50, 
//           borderColor: 'gray', 
//           borderWidth: 1, 
//           paddingHorizontal: 10, 
//           margin: 10, 
//           backgroundColor: '#fff'
//         }}
//         placeholder="Enter destination"
//         onChangeText={text => setDestination(text)}
//         value={destination}
//       />
//       <MapView
//         ref={mapRef} // Set the reference to the MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: 37.78895,
//           longitude: -12.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker coordinate={{ latitude: mLat, longitude: mLong }} />
//         {destination ? (
//           <MapViewDirections
//             origin={{ latitude: mLat, longitude: mLong }}
//             destination={destination}
//             apikey={GOOGLE_MAPS_APIKEY}
//             strokeWidth={3}
//             strokeColor="hotpink"
//             onReady={result => {
//               mapRef.current.fitToCoordinates(result.coordinates, {
//                 edgePadding: {
//                   right: 30,
//                   bottom: 300,
//                   left: 30,
//                   top: 100,
//                 },
//               });
//             }}
//           />
//         ) : null}
//       </MapView>
//       <TouchableOpacity 
//         style={{ 
//           width: '90%', 
//           height: 50, 
//           alignSelf: 'center', 
//           position: 'absolute', 
//           bottom: 20, 
//           backgroundColor: 'orange', 
//           justifyContent: 'center', 
//           alignItems: 'center' 
//         }}
//         onPress={getLocation}
//       >
//         <Text style={{ color: '#fff' }}>Get Current Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Map;



import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const GOOGLE_MAPS_APIKEY = 'AIzaSyDzp2nKIp_LsQaxvstKt-P37AWxRyuU_Hc'; // Replace with your Google Maps API key
const GOOGLE_MAPS_APIKEY = 'AIzaSyBBtthjOC66XiGt_IJyZCBUHniI2AmKxU8'; // Replace with your Google Maps API key

const Map = () => {
  const [mLat, setMLat] = useState(0);
  const [mLong, setMLong] = useState(0);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'We need access to your location to show maps.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setHasLocationPermission(true);
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        setHasLocationPermission(true);
      }
    };

    const getLocation = () => {
      if (!hasLocationPermission) {
        console.log('No location permission');
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setMLat(latitude);
          setMLong(longitude);

          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }, 1000);
          }
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission().then(() => {
      if (hasLocationPermission) {
        getLocation();
      }
    });
  }, [hasLocationPermission]);

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Enter origin"
        onPress={(data, details = null) => {
          setOrigin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
          container: { flex: 0 },
          textInputContainer: { marginHorizontal: 10, marginTop: 10 },
          textInput: { height: 50, color: '#5d5d5d', fontSize: 16 },
        }}
      />
      <GooglePlacesAutocomplete
        placeholder="Enter destination"
        onPress={(data, details = null) => {
          setDestination({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
          container: { flex: 0 },
          textInputContainer: { marginHorizontal: 10, marginTop: 10 },
          textInput: { height: 50, color: '#5d5d5d', fontSize: 16 },
        }}
      />
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 28.644800,
          longitude: 77.216721,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {mLat !== 0 && mLong !== 0 && (
          <Marker coordinate={{ latitude: mLat, longitude: mLong }} />
        )}
        {origin && (
          <Marker
            coordinate={{ latitude: origin.latitude, longitude: origin.longitude }}
            pinColor="green"
          />
        )}
        {destination && (
          <Marker
            coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
            pinColor="red"
          />
        )}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
              });
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;