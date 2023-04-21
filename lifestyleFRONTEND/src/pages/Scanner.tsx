import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import ArrowLeftSVG from '../../components/svg/ArrowLeftSVG';
import React, {useState} from 'react';
import { getRequest } from '../utils/requests';
import { constants } from '../utils/constants';

const Scanner = ({initialProps, navigation}: any) => {
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording},
    {touchToFocus},
  ] = useCamera(initialProps);

  const [productPromptIsOpen, setProductPromptIsOpen] = useState(false);

  const createTwoButtonAlert = (scanResult: BarCodeReadEvent): any => {
    if (productPromptIsOpen) {
      return;
    }
    if (!scanResult?.data) {
      return;
    }

    setProductPromptIsOpen(true);

    getRequest(`http://${constants.API_HOST}:5555/v1/products/${scanResult?.data}`)
      .then((response: any) => response.json())
      .then(json => {
        if (!json?.product?.product_name) {
          return Alert.alert('Error', 'Product was not found', [
            {
              text: 'Cancel',
              onPress: () => setProductPromptIsOpen(false),
              style: 'cancel',
            },
            {
              text: 'Add',
              onPress: () => {
                setProductPromptIsOpen(false);
              },
            },
          ]);
        }
        Alert.alert(
          'Product scanned',
          `The name of the product scanned is ${JSON.stringify(
            json?.product?.product_name,
          )}, is this correct?`,
          [
            {
              text: 'Cancel',
              onPress: () => setProductPromptIsOpen(false),
              style: 'cancel',
            },
            {
              text: 'Add',
              onPress: () => {
                navigation.navigate('AddProduct', {
                  product: json?.product,
                });
                setProductPromptIsOpen(false);
              },
            },
          ],
        );
      })
      .catch(error => {
        return Alert.alert(
          'Error',
          'Could not contact Products API or something went wrong :(',
          [
            {
              text: 'Cancel',
              onPress: () => setProductPromptIsOpen(false),
              style: 'cancel',
            },
            {
              text: 'Add',
              onPress: () => {
                setProductPromptIsOpen(false);
              },
            },
          ],
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        onBarCodeRead={scanResult => createTwoButtonAlert(scanResult)}
        type={type}
        style={{
          height: '100%',
          width: '100%',
        }}
      />

      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={touchToFocus}
      />
      <View
        style={{
          position: 'absolute',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          height: 50,
          width: '100%',
          backgroundColor: '#000',
          paddingLeft: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <ArrowLeftSVG
            width={20}
            height={20}
            style={{
              color: '#fff',
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Scanner;
