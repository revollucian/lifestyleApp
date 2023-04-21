import Window from "../../components/Window";
import Button from "../../components/Button";
import { alert } from "../utils/alerts";
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react';
import { passwordChange } from "../utils/networking";
import { CommonActions } from '@react-navigation/native';
import { removeData } from "../utils/store";


const ChangePassword = ({ navigation }: any) => {

    const [payload, setPayload] = useState({
        password: '',
        new_password: '',
    });

    const changePassword = async () => {
        if(!payload.password || !payload.new_password) 
        return alert('Error', 'Please fill both the old password and new password fields')
        const change = await passwordChange(payload);
        if(change === 'changed'){
            removeData('token').then(() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                );
            });
            alert('Success', 'Your password has been changed and you have been logged out.')
        }
    }

    return(
        <Window navigation={navigation}>
            <Text
                style={styles.h1}>
                Change password
            </Text>

            <View style={{display: 'flex', gap: 24, marginTop: 30}}>
                <TextInput
                    placeholder="Old password"
                    style={styles.input}
                    value={payload.password || ''}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={text => {
                        setPayload({...payload, password: text});
                    }}
                />
                <TextInput
                    placeholder="New password"
                    style={styles.input}
                    value={payload.new_password || ''}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={text => {
                        setPayload({...payload, new_password: text});
                    }}
                />
            </View>

            <Button onPress={changePassword} text="Change" styleProps={styles.button} color=""></Button>

        </Window>
    )
}   

const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#40DF9F',
        marginTop: 30
    },
    input: {
        fontSize: 16,
        color: '#96A7AF',
        borderBottomColor: '#96A7AF',
        borderBottomWidth: 1
    },
});


export default ChangePassword