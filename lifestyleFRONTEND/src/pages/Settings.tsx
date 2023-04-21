import { Text, StyleSheet, View, Alert } from 'react-native';
import { removeData } from '../utils/store';
import { CommonActions } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { constants } from '../utils/constants';
import { alert } from '../utils/alerts';
import Window from '../../components/Window';
import Button from '../../components/Button';
import { deleteRequest } from '../utils/requests';

const Settings = ({navigation}: any) => {

  const user = useSelector((state: any) => state.userReducer?.data);

  const signout = async () => {
    removeData('token').then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    });
  };
  
  const deleteProfile = async () => {
    Alert.alert('Profile deletion', 'By pressing OK you agree your profile being deleted, are you sure?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteRequest(`http://${constants.API_HOST}:5555/v1/users/delete-profile`)
            .then((response: any) => response.json())
            .then(async json => {
              if (json?.message === 'Profile deleted') {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                );
                return alert('Success', 'Your profile has been deleted.');
              }
            }).catch((e) => {
              return alert('Error', 'Something went wrong');
            })
        },
      },
    ]);
  }

  return (
    <Window navigation={navigation}>
        <Text
          style={styles.h1}>
          Settings
        </Text>

        <Text
          style={{...styles.h1, color: '#96A7AF', fontSize: 16, marginTop: 10}}>
          Account details
        </Text>

        <View style={{marginTop: 20}}>
          <Text>Name</Text>
          <Text
            style={{...styles.h1, fontSize: 12}}>
            {user?.name}
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text>Email</Text>
          <Text
            style={{...styles.h1, fontSize: 12}}>
            {user?.email}
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text>Username</Text>
          <Text
            style={{...styles.h1, fontSize: 12}}>
            {user?.username}
          </Text>
        </View>

        <View style={{
            marginTop: 20,
            display:'flex',
            gap: 10,
        }}>
          <Button text="Change password" color="transparent" onPress={() => {
            navigation.navigate("ChangePassword")
          }}/>
          <Button text="Change name" color="transparent" onPress={() => {
            navigation.navigate("ChangeName")
          }}/>
          <Button text="Delete profile" color="#FF575F" onPress={deleteProfile} styleProps={{paddingHorizontal: 20}}/>
          <Button text="Sign out" color="#FF575F" onPress={signout} styleProps={{paddingHorizontal: 20}}/>
        </View>
    </Window>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#fff',
  },
  redButton: {
    backgroundColor: '#FF575F',
    display: 'flex',
    justifyContent: 'center',
    height: 58,
    borderRadius: 12,
  },
});

export default Settings;
