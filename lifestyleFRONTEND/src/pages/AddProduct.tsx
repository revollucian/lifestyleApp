import {
  Image, View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput,
} from 'react-native';
import {addProductToDailyEntry} from '../utils/networking';
import {useState} from 'react';
import {DateTime} from 'luxon';
import {useDispatch} from 'react-redux';
import {setEntryData} from '../reducers/entryReducer';
import { alert } from '../utils/alerts';
import Window from '../../components/Window';

const AddProduct = (props: any) => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const [uri, setURI] = useState(route?.params?.product?.image_url);
  const [payload, setPayload] = useState({
    date: DateTime.now().startOf('day').toMillis(),
    code: route?.params?.product?.code,
    grams_consumed: '',
    calories_per_100g: '',
  });

  const addProduct = async () => {
    if(!payload.grams_consumed) return alert('Error', 'Some fields are missing.')
    if(!route?.params?.product?.nutriments['energy-kcal_100g'] && !payload.calories_per_100g) return alert('Error', 'Some fields are missing.')
    const entry = await addProductToDailyEntry(payload, navigation);
    if (entry) {
      dispatch(setEntryData(entry));
      return navigation.navigate('Dashboard');
    }
  };

  return (
        <Window navigation={navigation}>
          <View>
            <View style={styles.containerChild1}>
              <View style={{width: '40%'}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: uri}}
                  onError={() => {
                    setURI(require('../assets/png/notFound.png'));
                  }}
                />
              </View>

              <View style={{flexDirection: 'column', gap: 5, width: '60%'}}>
                <Text style={styles.heading}>
                  {route?.params?.product?.product_name}
                </Text>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#96A7AF'}}>
                  {route?.params?.product?.brands}
                </Text>
              </View>
            </View>

            <View style={styles.containerChild2}>
              <View style={{flexDirection: 'column', gap: 5, width: '60%'}}>
                <Text style={styles.heading}>Ingredients</Text>
                <Text style={styles.subheading}>
                  {route?.params?.product?.brands}
                </Text>
              </View>

              <ScrollView>
                <Text>
                  {route?.params?.product?.nutriments.ingredients_text ||
                    'List of ingredients is not available for this product at this time, if you want to add details for this product reach out to our team.'}
                </Text>
              </ScrollView>
            </View>

            <View style={styles.containerChild3}>
              <View style={{flexDirection: 'column', gap: 5, width: '60%'}}>
                <Text style={styles.heading}>Calories</Text>
              </View>

              <ScrollView>
                <Text>
                  {route?.params?.product?.nutriments['energy-kcal_100g']
                    ? `Aproximately ${route?.params?.product?.nutriments['energy-kcal_100g']} calories per 100g/mL`
                    : 'Data is not available.'}
                </Text>
              </ScrollView>
            </View>

            {!route?.params?.product?.nutriments['energy-kcal_100g'] && (
              <View style={styles.containerChild4}>
                <Text style={styles.heading}>Add data</Text>
                <Text style={styles.subheading}>
                  This product is missing nutriment data, please input this
                  information below.
                </Text>

                <TextInput
                  placeholder="kcal per 100g (or ml)"
                  autoCapitalize="none"
                  style={{...styles.input, width: '100%'}}
                  keyboardType="numeric"
                  value={payload.calories_per_100g}
                  onChangeText={text => {
                    setPayload({...payload, calories_per_100g: text});
                  }}
                />
              </View>
            )}

            <View style={styles.containerChild5}>
              <TextInput
                placeholder="Amount in g/ml"
                autoCapitalize="none"
                style={styles.input}
                keyboardType="numeric"
                value={payload.grams_consumed}
                onChangeText={text => {
                  setPayload({...payload, grams_consumed: text});
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  addProduct();
                }}
                style={styles.createAnAccountButton}>
                <Text style={{fontSize: 16, fontWeight: '900', color: '#3DD598'}}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Window>

  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#22343C',
  },
  containerChild1: {
    backgroundColor: '#30444E',
    borderRadius: 25,
    height: 109,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    overflow: 'hidden',
  },
  containerChild2: {
    backgroundColor: '#30444E',
    borderRadius: 25,
    height: 220,
    width: '100%',
    marginTop: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  containerChild3: {
    backgroundColor: '#30444E',
    borderRadius: 25,
    height: 120,
    width: '100%',
    marginTop: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  containerChild4: {
    backgroundColor: '#30444E',
    borderRadius: 25,
    height: 160,
    width: '100%',
    marginTop: 18,
    display: 'flex',
    gap: 12,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  containerChild5: {
    backgroundColor: '#30444E',
    borderRadius: 25,
    height: 80,
    width: '100%',
    marginTop: 18,
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    overflow: 'hidden',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    color: '#96A7AF',
    width: '60%',
  },
  createAnAccountButton: {
    backgroundColor: '#286053',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    borderRadius: 12,
    width: '40%',
    paddingHorizontal: 24,
  },
  heading: {fontSize: 20, fontWeight: 'bold', color: '#fff'},
  subheading: {fontSize: 12, fontWeight: 'bold', color: '#96A7AF'},
});

export default AddProduct;
