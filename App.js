import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UploadProfilePicScreen from './screens/UploadProfilePicScreen';
import CalculateDistanceScreen from './screens/CalculateDistanceScreen';
import CalculateDistanceResultScreen from './screens/CalculateDistanceResultScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UploadProfilePicScreen">
        <Stack.Screen name="UploadProfilePicScreen" component={UploadProfilePicScreen} />
        <Stack.Screen name="CalculateDistanceScreen" component={CalculateDistanceScreen} />
        <Stack.Screen name="CalculateDistanceResultScreen" component={CalculateDistanceResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
