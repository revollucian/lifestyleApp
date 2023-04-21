import Window from "../../components/Window";
import Button from "../../components/Button";
import { StyleSheet, Text, View } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useState } from 'react'
import { Dimensions } from 'react-native';

const time = (remainingTime: any) => {
    let minutes = Math.floor(remainingTime / 60)
    let seconds = (remainingTime % 60).toString()
    if(parseInt(seconds) < 10 && parseInt(seconds) !== 0){ seconds = '0' + seconds }
    if(seconds === '0'){ seconds = '00' }
    return `${minutes}:${seconds}`
}

const Meditate = ({navigation}: any) => {
    const windowWidth = Dimensions.get('window').width;
    const [playing, setPlaying] = useState(false)
    const [duration, setDuration] = useState(60)
    const [key, setKey] = useState(0)

    const toggleTimer = () => {
        setPlaying(playing ? false : true)
    }

    const resetTimer = () => {
        setKey(prevKey => prevKey +1)
        setPlaying(false)
    }

    const addMinute = () => {
        setDuration(duration + 60)
    }

    const removeMinute = () => {
        if(duration === 60) return
        setDuration(duration - 60)
    }

    return(
        <Window navigation={navigation}>
            <Text
                style={styles.h1}>
                Meditate
            </Text>
            <Text
                style={{...styles.subheading}}>
                We dont store any information about your meditation sessions, its all about you.
            </Text>

            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, marginTop: 36}}>
                Did you know
            </Text>
            <Text
                style={{...styles.subheading, marginTop: 16}}>
                Mindfulness meditation has long been used by various populations around the world who claim that it can lead to improved memory.
            </Text>

            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24}}>
                <CountdownCircleTimer
                    strokeWidth={14}
                    size={windowWidth - 60}
                    key={key}
                    isPlaying={playing}
                    duration={duration}
                    isSmoothColorTransition
                    colors={['#40DF9F', '#625B39']}
                    colorsTime={[7, 5]}
                    onComplete={resetTimer}
                >
                    {({ remainingTime }) => <Text style={{fontSize: 50}}>{time(remainingTime)}</Text>}
                </CountdownCircleTimer>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button text={playing ? '⏸︎' : '▶️'} onPress={toggleTimer} styleProps={styles.button}/>
                <Button text={'🔄'} onPress={resetTimer} styleProps={styles.button}/>
                <Button text={'🔼'} onPress={addMinute} styleProps={styles.button}/>
                <Button text={'🔽'} onPress={removeMinute} styleProps={styles.button}/>
            </View>

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
        backgroundColor: '#286053',
        marginTop: 30,
        width: '22%'
    },
    input: {
        fontSize: 16,
        color: '#96A7AF',
        borderBottomColor: '#96A7AF',
        borderBottomWidth: 1
    },
    buttonCenterContent: {
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    subheading: {fontSize: 12, fontWeight: 'bold', color: '#96A7AF', marginTop: 16},
});

export default Meditate