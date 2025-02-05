// src/navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { logout } from '../actions/authActions';

const Drawer = createDrawerNavigator();

// Custom component for the left header button (hamburger)
const CustomHeaderLeft = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 10 }}>
    <Text style={{ fontSize: 24 }}>☰</Text>
  </TouchableOpacity>
);

// Custom component for the right header button (logoff)
const CustomHeaderRight = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogoff = () => {
    dispatch(logout());
    // Replace the current screen stack with the Login screen.
    navigation.replace('Login');
  };

  return (
    <TouchableOpacity onPress={handleLogoff} style={{ marginRight: 10 }}>
      <Text style={{ color: 'red', fontSize: 16 }}>Logoff</Text>
    </TouchableOpacity>
  );
};

const DrawerNavigator = () => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        initialRouteName="Tabs"
        screenOptions={({ navigation }) => ({
          // Enable header for drawer screens
          headerShown: true,
          // Place the hamburger icon on the left
          headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
          // Place the logoff button on the right
          headerRight: () => <CustomHeaderRight navigation={navigation} />,
        })}
      >
        <Drawer.Screen name="Tabs" component={TabNavigator} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>

      {/* <View style={styles.marqueeContainer}>
        <ScrollableText />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
  // marqueeContainer: {
  //   position: 'relative', // Ensures it stays below the settings bar
  //   zIndex: 1, // Lower priority than header
  // },
});

export default DrawerNavigator;
