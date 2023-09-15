// screens/CalculateDistanceResultScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image } from 'react-native';

const CalculateDistanceResultScreen = ({ route, navigation }) => {
  const [distanceKm, setDistanceKm] = useState('');
  const [distanceMiles, setDistanceMiles] = useState('');
  const [unit, setUnit] = useState('km');

  const calculateDistance = () => {
    const lat1 = parseFloat(route.params.latitude);
    const lon1 = parseFloat(route.params.longitude);
    // Replace these values with the actual latitude and longitude of the destination point.
    const lat2 = 0.0; // Destination latitude
    const lon2 = 0.0; // Destination longitude

    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;

    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515; // Distance in miles
    dist = dist * 1.609344; // Distance in kilometers

    setDistanceKm(dist.toFixed(2)); // Set distance in kilometers
    setDistanceMiles((dist / 1.609344).toFixed(2)); // Set distance in miles
  };

  const handleCalculate = () => {
    calculateDistance();
  };

  const handleUnitChange = (selectedUnit) => {
    setUnit(selectedUnit);
  };

  const handlePrevious = () => {
    // Go back to Screen 2
    navigation.goBack();
  };

  return (
    <View>
      <Image source={{ uri: route.params.profilePic }} style={{ width: 200, height: 200 }} />
      {/* Display the profile pic here */}
      <TextInput
        placeholder="Enter Latitude"
        value={route.params.latitude}
        editable={false}
      />
      <TextInput
        placeholder="Enter Longitude"
        value={route.params.longitude}
        editable={false}
      />
      <TextInput
        placeholder="Distance"
        value={unit === 'km' ? distanceKm : distanceMiles}
        editable={false}
      />
      <Text>Choose Unit:</Text>
      <Button title="km" onPress={() => handleUnitChange('km')} />
      <Button title="miles" onPress={() => handleUnitChange('miles')} />
      <Button title="Calculate" onPress={handleCalculate} />
      <Button title="Previous" onPress={handlePrevious} />
    </View>
  );
};

export default CalculateDistanceResultScreen;
