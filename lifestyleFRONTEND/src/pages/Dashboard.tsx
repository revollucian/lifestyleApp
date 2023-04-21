import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import useStepCounter from '../hooks/useStepCounter';
import CameraSVG from '../../components/svg/CameraSVG';
import StarSVG from '../../components/svg/StarSVG';
import HeartSVG from '../../components/svg/HeartSVG';
import PlusSVG from '../../components/svg/PlusSVG';
import GearSVG from '../../components/svg/GearSVG';
import ChartSVG from '../../components/svg/ChartSVG';
import {ProgressChart} from 'react-native-chart-kit';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {DateTime} from 'luxon';
import {getStringData} from '../utils/store';
import { getRequest } from '../utils/requests';
import { useDispatch } from 'react-redux';
import { setUserData } from '../reducers/userReducer';
import { setUserSteps } from '../reducers/userReducer';
import { constants } from '../utils/constants';


var ws = new WebSocket(`ws://${constants.API_HOST}:5555/`);
ws.onerror = e => {
  console.error(e.message);
};

export const getStepPer = (stepCount: any, user: any) => {
  return parseFloat(((stepCount! / (user?.step_quota / 100)) / 100).toPrecision(2)) || 0
}
export const getStepPerUpscaled = (stepCount: any, user: any) => {
  return (stepCount! / (user?.step_quota / 100)).toPrecision(1) || 0
}
export const getCaloriePer = (entry: any, user: any) => {
  return parseFloat(((entry?.total_calories! / (user?.step_quota / 100)) / 100).toPrecision(2)) || 0
}
export const getCaloriePerUpscaled = (entry: any, user: any) => {
  return (entry?.total_calories! / (user?.step_quota / 100)).toPrecision(2) || 0
}

const Dashboard = (props: any) => {

  const {navigation} = props;
  const {stepCount} = useStepCounter();
  const dispatch = useDispatch()

  const entry = useSelector((state: any) => state.entryReducer.data);
  const user = useSelector((state: any) => state.userReducer.data);

  const [chartData] = useState<any>({
    data: [],
    colors: ['255, 197, 66', '255, 87, 95', '61, 213, 152'],
  })

  const chartConfig = {
    backgroundColor: '#30444E',
    backgroundGradientFrom: '#30444E',
    backgroundGradientTo: '#30444E',
    color: (opacity = 1, index: any) =>
      `rgba(${chartData?.colors[index] || '0, 0, 0'}, ${opacity})`,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await getRequest(`http://${constants.API_HOST}:5555/v1/users/profile`)
      .then(response => response?.json())
      .then(async json => {
        if (json?.user) {
          return dispatch(setUserData(json?.user));
        }
      });
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const sendData = async () => {
      if (stepCount === undefined) {
        return;
      }
      ws.send(
        JSON.stringify({
          token: await getStringData('token'),
          date: DateTime.now().startOf('day').toMillis(),
          steps: stepCount,
        }),
      );
    };
    sendData();
    dispatch(setUserSteps(stepCount))

  }, [stepCount]);

  if(!entry || !user) return <View style={{height: '100%', backgroundColor: '#22343C'}}></View>

  return (
    <SafeAreaView
      style={styles.container}>
      {/* scrollview */}
      <ScrollView style={{paddingLeft: 31, paddingRight: 31}}>
        <Text
          style={styles.h1}>
          Dashboard
        </Text>

        <View
          style={styles.containerChild}>
          <View
            style={styles.containerStepsLeft}>
            <Text style={{fontSize: 35}}>🏃</Text>
          </View>

          <View style={{flexDirection: 'column', gap: 5}}>
            <Text style={styles.header}>
              {stepCount || 0} steps
            </Text>
            <Text style={styles.subheader}>
              Steps done today, your target
            </Text>
            <Text style={styles.subheader}>
              is {user?.step_quota || 0} steps.
            </Text>
          </View>
        </View>

        <View
          style={styles.containerChild1}>
          <View
            style={styles.containerChart}>
            <ProgressChart
              data={{
                data: [
                  getStepPer(stepCount, user) || 0,
                  getCaloriePer(entry, user) || 0,
                  getStepPer(stepCount, user) || 0,
                ],
                colors: ['255, 197, 66', '255, 87, 95', '61, 213, 152'],
              }}
              width={100}
              height={100}
              strokeWidth={6}
              radius={35}
              chartConfig={chartConfig}
              hideLegend
            />
          </View>

          <View
            style={{
              width: '60%',
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: 24,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
              {parseInt(entry?.total_calories) || 0} calories
            </Text>
            <View style={{display: 'flex', gap: 4}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 15,
                    height: 10,
                    backgroundColor: '#FFC542',
                    borderRadius: 6,
                  }}
                />
                <Text style={{fontSize: 14, color: '#96A7AF'}}>
                  {getStepPerUpscaled(stepCount, user) || 0}% of step goal
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 15,
                    height: 10,
                    backgroundColor: '#FF575F',
                    borderRadius: 6,
                  }}
                />
                <Text style={{fontSize: 14, color: '#96A7AF'}}>
                  {getCaloriePerUpscaled(entry, user) || 0}% of kcal goal
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 15,
                    height: 10,
                    backgroundColor: '#3DD598',
                    borderRadius: 6,
                  }}
                />
                <Text style={{fontSize: 14, color: '#96A7AF'}}>
                  {getStepPerUpscaled(stepCount, user) || 0}% of km goal
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={styles.containerChild2}>
          <View style={{width: '70%', display: 'flex', paddingTop: 24}}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 15}}>
              <View
                style={{
                  width: 45,
                  height: 44,
                  backgroundColor: '#81E4BC',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <StarSVG height={22} width={22} style={{color: '#fff'}} />
              </View>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
                Scan items
              </Text>
            </View>
            <Text style={{fontSize: 14, marginTop: 10}}>
              Click on the OK button to scan a new item to add to your daily
              calorie count!
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Scanner');
              }}>
              <View
                style={{
                  height: 66,
                  width: 66,
                  backgroundColor: '#81E4BC',
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: 52,
                    width: 52,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#81E4BC', fontStyle: 'italic'}}>
                    ok
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* menu bar */}
      <View
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
              navigation.navigate('Scanner');
            }}>
            <CameraSVG height={24} width={24} style={{color: '#fff'}} />
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
      </View>
    </SafeAreaView>
  );
};

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

export default Dashboard;
