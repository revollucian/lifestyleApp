import {useState, useEffect} from 'react';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {getEntry} from '../utils/networking';
import {DateTime} from 'luxon';
import {useDispatch} from 'react-redux';
import {setEntryData} from '../reducers/entryReducer';

const useStepCounter = () => {
  const [stepCount, setStepCount] = useState<number | undefined>(undefined);
  const [entryLoaded, setEntryLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const date = DateTime.now().startOf('day').toMillis();
  useEffect(() => {
    const fetchEntry = async () => {
      const entry = await getEntry(date);
      if (typeof entry?.steps === 'number') {
        setStepCount(entry?.steps);
        setEntryLoaded(true);
        dispatch(setEntryData(entry));
      }
    };
    fetchEntry();
  }, []);

  useEffect(() => {
    if (!entryLoaded) {
      return;
    }
    let subscription: any = null;
    setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
    subscription = accelerometer.subscribe(({x, y, z}: any) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > 10.5) {
        // adjust this threshold value based on your needs
        setStepCount((count: any) => count + 1);
      }
    });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [entryLoaded]);

  return {stepCount};
};

export default useStepCounter;
