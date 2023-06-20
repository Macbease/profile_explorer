import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from './screens/list';
import Search from './screens/search';
import Profile from "./screens/profile";
import Prompts from './screens/prompts';
import MyCard from './screens/myCards';
import Explore from './screens/explore';
import ChooseInterest from './screens/chooseInterest';
import SavedCards from './screens/savedCards';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="list" component={List} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="prompts" component={Prompts} />
        <Stack.Screen name="myCard" component={MyCard} />
        <Stack.Screen name="explore" component={Explore} />
        <Stack.Screen name="chooseInterest" component={ChooseInterest} />
        <Stack.Screen name="savedCards" component={SavedCards} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
