import React, { useState } from 'react';
import { View, TextInput, Button, Image, } from 'react-native';

const CalculateDistanceScreen = ({ route, navigation }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isDataSaved, setIsDataSaved] = useState(false);

  const handleSave = () => {
    if (latitude && longitude) {
      setIsDataSaved(true);
    }
  };

  const handleNext = () => {
    navigation.navigate('CalculateDistanceResultScreen', {
      latitude,
      longitude,
      profilePic: route.params.profilePic,
    });
  };

  return (
    <View>
      <Image source={{ uri: route.params.profilePic }} style={{ width: 200, height: 200 }} />
      <TextInput
        placeholder="Enter Latitude"
        onChangeText={text => setLatitude(text)}
        value={latitude}
      />
      <TextInput
        placeholder="Enter Longitude"
        onChangeText={text => setLongitude(text)}
        value={longitude}
      />
      <Button title="Save" onPress={handleSave} />
      <Button
        title="Next"
        onPress={handleNext}
        disabled={!isDataSaved}
      />
    </View>
  );
};

export default CalculateDistanceScreen;
