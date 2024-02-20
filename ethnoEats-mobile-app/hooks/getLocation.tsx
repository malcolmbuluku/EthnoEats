import React from 'react'
import { useState } from 'react';
import * as Location from "expo-location";
import  useLocationStore from '@/store/locationStore';

export default function getLocation () {
    const [location, setlocalLocation] = useState({});
    const { setLocation } = useLocationStore();

    async function requestLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            setlocalLocation(location);
                setLocation({
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude,
                    description: 'My Location!'
                });
        }
        
        
    }
  return {location, requestLocation}
}
