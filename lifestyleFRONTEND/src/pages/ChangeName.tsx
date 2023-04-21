import Window from "../../components/Window";
import Button from "../../components/Button";
import { alert } from "../utils/alerts";
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react';
import { nameChange } from "../utils/networking";
import { useDispatch } from "react-redux";
import { setUserData } from "../reducers/userReducer";



const ChangeName = ({ navigation }: any) => {

    const [payload, setPayload] = useState({
        name: '',
    });

    const dispatch = useDispatch()

    const changeName = async () => {
        if(!payload.name) 
        return alert('Error', 'Some fields are missing')
        const change = await nameChange(payload);
        if(change){
            navigation.navigate('Settings')
            alert('Success', 'Your name has been changed.')
            dispatch(setUserData(change))
        }
    }

    return(
        <Window navigation={navigation}>
            <Text
                style={styles.h1}>
                Change name
            </Text>
            <View style={{display: 'flex', gap: 24, marginTop: 30}}>
                <TextInput
                    placeholder="New name"
                    style={styles.input}
                    value={payload.name || ''}
                    onChangeText={text => {
                        setPayload({...payload, name: text});
                    }}
                />
            </View>
            <Button onPress={changeName} text="Change" styleProps={styles.button} color=""/>
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


export default ChangeName