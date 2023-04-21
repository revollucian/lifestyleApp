import {SafeAreaView, ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import HeartSVG from '../components/svg/HeartSVG';
import PlusSVG from '../components/svg/PlusSVG';
import GearSVG from '../components/svg/GearSVG';
import ChartSVG from '../components/svg/ChartSVG';
import HomeSVG from './svg/HomeSVG';

const Window = ({ children, navigation, doesNotHaveToolbar }: any) => {
    return(
        <SafeAreaView
            style={{
            backgroundColor: '#22343C',
            height: '100%',
            }}>
            <ScrollView style={{            
                paddingHorizontal: 30,
            }} 
            scrollEnabled>
                <View style={{paddingVertical: 24}}>{children}</View>
            </ScrollView>

            {!doesNotHaveToolbar && <View
                style={{
                backgroundColor: '#30444E',
                height: 96,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 36,
                }}>
                <TouchableOpacity
                    style={styles.buttonCenterContent}
                    onPress={() => {
                    navigation.navigate('Meditate');
                    }}>
                    <HeartSVG height={28} width={28} style={{color: '#96A7AF'}} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonCenterContent}
                    onPress={() => {
                    navigation.navigate('AddProductArbitrary');
                    }}>
                    <PlusSVG height={24} width={24} style={{color: '#96A7AF'}} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                    backgroundColor: '#3DD598',
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    ...styles.buttonCenterContent
                    }}
                    onPress={() => {
                    navigation.navigate('Dashboard');
                    }}>
                    <HomeSVG height={24} width={24} style={{color: '#fff'}} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonCenterContent}
                    onPress={() => {
                    navigation.navigate('Stats');
                    }}>
                    <ChartSVG height={24} width={24} style={{color: '#96A7AF'}} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonCenterContent}
                    onPress={() => {
                    navigation.navigate('Settings');
                    }}>
                    <GearSVG height={24} width={24} style={{color: '#96A7AF'}} />
                </TouchableOpacity>
                </View>
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#22343C',
    },
    buttonCenterContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1: {
      marginTop: 20,
      fontSize: 42,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      color: '#fff',
    },
    header: {fontSize: 20, fontWeight: 'bold', color: '#fff'},
    subheader: {fontSize: 12, fontWeight: 'bold', color: '#96A7AF'},
    containerChild: {
      backgroundColor: '#30444E',
      borderRadius: 25,
      height: 109,
      width: '100%',
      marginTop: 31,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 24,
      gap: 24,
    },
    containerChild1: {
      backgroundColor: '#30444E',
      borderRadius: 25,
      height: 159,
      width: '100%',
      marginTop: 31,
      display: 'flex',
      flexDirection: 'row',
    },
    containerChild2: {
      backgroundColor: '#3ED598',
      borderRadius: 25,
      height: 188,
      width: '100%',
      marginTop: 31,
      marginBottom: 31,
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: 24,
      paddingRight: 24,
    },
    containerStepsLeft: {
      backgroundColor: '#EDF1FA',
      width: 80,
      height: 60,
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerChart: {
      width: '40%',
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: 24,
    },
   
  });

export default Window