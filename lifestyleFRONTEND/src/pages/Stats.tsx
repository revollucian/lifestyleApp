import Window from "../../components/Window";
import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { getStats } from "../utils/networking";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { getCaloriePerUpscaled, getStepPerUpscaled } from "./Dashboard";
import ArrowDownSVG from "../../components/svg/ArrowDownSVG";
import ArrowUpSVG from "../../components/svg/ArrowUpSVG";
import { DateTime } from "luxon"
const screenWidth = Dimensions.get("window").width;

//sample data
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      { data: [20, 45, 28, 80, 99, 43], color: (opacity = 1) => `rgba(255, 87, 95, 1)`, strokeWidth: 2 },
      { data: [22, 100, 44, 80, 20, 40], color: (opacity = 1) => `rgba(255, 197, 66, 1)`, strokeWidth: 3 }
    ],
    legend: ["Steps", "Calories"] // optional
};

const createChartData = (entriesData: any) => {
    const newDataObject = {
        labels: [...entriesData.map((entry: any) => DateTime.fromMillis(entry?.date).weekdayShort)],
        datasets: [
          {
            data: [...entriesData.map((entry: any) => parseInt(entry?.steps))],
            color: (opacity = 1) => `rgba(255, 87, 95, 1)`, // optional
            strokeWidth: 2 // optional
          },
          {
            data: [...entriesData.map((entry: any) => parseInt(entry?.total_calories))],
            color: (opacity = 1) => `rgba(255, 197, 66, 1)`, // optional
            strokeWidth: 3 // optional
          }
        ],
        legend: ["Steps", "Calories"] // optional
    }
    if(newDataObject?.labels.length === 0) return data
    return newDataObject
}

const Stats = ({navigation}: any) => {

    const [entriesData, setEntriesData] = useState<any>([])
    const [chartData, setChartData] = useState<any>(createChartData(entriesData))

    const entry = useSelector((state: any) => state.entryReducer.data);
    const user = useSelector((state: any) => state.userReducer);

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    useEffect(() => {
        const fetchUser = async () => {
            const entries = await getStats();
            if(entries) return setEntriesData(entries)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        if(entriesData){
            const newData = createChartData(entriesData)
            if(newData){
                setChartData(newData)
            }
        }
    }, [entriesData])

    if(!entry || !user) return <View style={{height: '100%', backgroundColor: '#22343C'}}></View>

    return(
        <Window navigation={navigation}>
            <Text
                style={styles.h1}>
                Statistics
            </Text>
            <View style={{marginTop: 36, borderRadius: 25, overflow: "hidden"}}>
                <LineChart
                    data={chartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>
            <View style={{...styles.panel, marginTop: 24}}>
                <View style={{width: '30%'}}>
                    <View style={styles.childLeft}>
                        <ArrowDownSVG style={{color: '#fff'}}/>
                    </View>
                </View>
                <View style={{width: '70%', display: 'flex', gap: 30}}>
                    <View  style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.text}>Steps progress</Text>
                        <Text style={{...styles.text, color: '#FF575F'}}>{getStepPerUpscaled(user?.steps, user?.data) || 0}%</Text>
                    </View>
                    <View style={{height: 10, width: '100%', backgroundColor: '#2A3C44', borderRadius: 6}}>
                        <View style={{height: 10, width: `${getStepPerUpscaled(user?.steps, user?.data) || 0}%`, backgroundColor: '#FF575F', borderRadius: 6}}>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{...styles.panel, marginTop: 24}}>
                <View style={{width: '30%'}}>
                    <View style={{...styles.childLeft, backgroundColor: "#FFC542"}}>
                        <ArrowUpSVG style={{color: '#fff'}}/>
                    </View>
                </View>

                <View style={{width: '70%', display: 'flex', gap: 30}}>
                    <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.text}>Calorie progress</Text>
                        <Text style={{...styles.text, color: '#FFC542'}}>{getCaloriePerUpscaled(entry, user?.data) || 0}%</Text>
                    </View>

                    <View style={{height: 10, width: '100%', backgroundColor: '#2A3C44', borderRadius: 6}}>
                        <View style={{height: 10, width: `${getCaloriePerUpscaled(entry, user?.data) || 0}%`, backgroundColor: '#FFC542', borderRadius: 6}}>
                        </View>
                    </View>
                </View>
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
    text: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 14
    },
    childLeft: {
        width:  59,
        height:  59,
        backgroundColor: '#FF565E',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    panel: {
        width: '100%',
        height:  105,
        backgroundColor: '#30444E',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24
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

export default Stats