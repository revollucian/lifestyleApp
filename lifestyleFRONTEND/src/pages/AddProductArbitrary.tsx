import Window from "../../components/Window";
import Button from "../../components/Button";
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react';
import {DateTime} from 'luxon';
import { addArbitraryProductToDailyEntry } from "../utils/networking";
import {useDispatch} from 'react-redux';
import {setEntryData} from '../reducers/entryReducer';
import { alert } from "../utils/alerts";

const AddProductArbitrary = ({navigation}: any) => {

    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        date: DateTime.now().startOf('day').toMillis(),
        grams_consumed: '',
        calories_per_100g: '',
        product_name: '',
    });
    const addProduct = async () => {
        if(!payload.product_name || !payload.calories_per_100g || !payload.grams_consumed) return alert('Error', 'Some fields are missing.')
        const entry = await addArbitraryProductToDailyEntry(payload, navigation);
        if (entry) {
          dispatch(setEntryData(entry));
          return navigation.navigate('Dashboard');
        }
    };

    return(
        <Window navigation={navigation}>    
            <Text
                style={styles.h1}>
                Add product
            </Text>

            <Text
                style={{color: '#96A7AF', fontSize: 14, marginTop: 10}}>
                Sometimes products that you scan will not be present in our database, use this screen to add a product to your daily entry manually.
            </Text>
            <View style={{display: 'flex', gap: 24, marginTop: 30}}>
                <TextInput
                    placeholder="Product name"
                    style={styles.input}
                    value={payload.product_name || ''}
                    onChangeText={text => {
                        setPayload({...payload, product_name: text});
                    }}
                />
                <TextInput
                    placeholder="Kcal per 100g (or ml)"
                    style={styles.input}
                    value={payload.calories_per_100g || ''}
                    keyboardType="numeric"
                    onChangeText={text => {
                        setPayload({...payload, calories_per_100g: text});
                    }}
                />
                <TextInput
                    placeholder="Enter amount you had in g/ml"
                    style={styles.input}
                    value={payload.grams_consumed || ''}
                    keyboardType="numeric"
                    onChangeText={text => {
                        setPayload({...payload, grams_consumed: text});
                    }}
                />
            </View>

            <Button onPress={addProduct} text="Add" styleProps={styles.button} color=""></Button>
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

export default AddProductArbitrary