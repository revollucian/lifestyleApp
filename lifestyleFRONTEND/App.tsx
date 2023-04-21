import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Scanner from './src/pages/Scanner';
import Dashboard from './src/pages/Dashboard';
import AddProduct from './src/pages/AddProduct';
import Settings from './src/pages/Settings';
import AddProductArbitrary from './src/pages/AddProductArbitrary';
import ChangePassword from './src/pages/ChangePassword';
import ChangeName from './src/pages/ChangeName';
import Meditate from './src/pages/Meditate';
import Stats from './src/pages/Stats';
import ChangePasswordUnauth from './src/pages/ChangePasswordUnauth';

import store from './src/store/store';
import {Provider} from 'react-redux';
import {getStringData} from './src/utils/store';
import {useState, useEffect} from 'react';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [auth, setAuth] = useState<string | boolean>('uninitialized');

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getStringData('token');
      token ? setAuth(true) : setAuth(false);
    };
    checkAuth();
  }, []);

  if (auth === 'uninitialized') {
    return <></>;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={auth ? 'Dashboard' : 'Login'}>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="AddProductArbitrary" component={AddProductArbitrary} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ChangeName" component={ChangeName} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="Meditate" component={Meditate} />
          <Stack.Screen name="ForgotPassword" component={ChangePasswordUnauth} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
