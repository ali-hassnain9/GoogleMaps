import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View,} from 'react-native';
import CustomHeader from "./Header";
import MapView, {Callout, Marker, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions"
import Geolocation from "react-native-geolocation-service"
import mapStyleDark from "./mapStyleDark.json"


const App = () => {
    const [location, setLocation] = useState(null)
    const [darkTheme, setDarkTheme] = useState(false)
    const {width, height} = Dimensions.get("window")
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    const getDarkTheme = () => {
        setDarkTheme(!darkTheme)
    }
    useEffect(() => {
        handleLocationPermission()
    }, [])

    useEffect(() => { // 👈
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords
                setLocation({latitude, longitude})
            },
            error => {
                console.log(error.code, error.message)
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        )
    }, [])

    const handleLocationPermission = async () => { // 👈
        let permissionCheck = '';
        if (Platform.OS === 'ios') {
            permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }

        if (Platform.OS === 'android') {
            permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }
    };


    return (
        <View style={{flex: 1}}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <CustomHeader title="Maps" menuButtonText={darkTheme ? "light" : "dark"}
                              menuButtonClicked={() => getDarkTheme()}/>
            </View>
            <View style={styles.container}>
                {location &&
                    <MapView
                        customMapStyle={darkTheme ? mapStyleDark : null}
                        fitToElements={true}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        showsUserLocation={true}
                    >
                        <View>
                            <Marker
                                coordinate={{
                                    longitude: 74.34964268457912,
                                    latitude: 31.52802560898218,
                                }}

                            >
                                <Callout>
                                    <Text>EMPG is rocking here!</Text>
                                </Callout>
                            </Marker>
                            <Marker
                                coordinate={{
                                    latitude: 31.453571231292255, longitude: 74.22763768926319
                                }}

                            >
                                <Callout>
                                    <Text>Home</Text>
                                </Callout>
                            </Marker>
                            <Polyline
                                coordinates={[
                                    {latitude: 31.52802560898218, longitude: 74.34964268457912},
                                    {latitude: 31.453571231292255, longitude: 74.22763768926319},
                                ]}
                                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                strokeColors={[
                                    // '#7F0000',
                                    // '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                    // '#B24112',
                                    // '#E5845C',
                                    '#238C23',
                                    '#7F0000'
                                ]}
                                strokeWidth={6}
                            />
                        </View>

                    </MapView>}


            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        top: 70,
        zIndex: -1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,

    },
})

export default App;
