import React from 'react'
import moment from 'moment'
import {View, Text, StyleSheet} from 'react-native'
import {UserContext} from '../components/context'
const ScheduleScreen = ({navigation}) =>{

    const getAllDayInWeek = (date) =>{
        const DAY_TO_SECONDS = 24 * 60 * 60
        
        //customize first day of week is Monday 
        moment.updateLocale("en", { week: {
            dow: 1, // First day of week is Monday
            doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
          }});
        moment.updateLocale('en', {
        weekdays : [
            "Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"
        ]
        });
          
        const getFirstDay = ((dayUnix, prevDay) =>{
           
           return  dayUnix - ((prevDay -1) * DAY_TO_SECONDS)
           // prevDay -1 | Sunday begin at 0 
        }) 

        const getNextDay = (step, dayUnix) =>{
            return dayUnix + step * DAY_TO_SECONDS
        }

        const isOutOfWeek = (weekIndex, dayUnix) =>{
            return moment.unix(dayUnix).utc(true).week() !== weekIndex
        }
        const currentDate = moment(date, "DD/MM/YYYY")
        const firstDate = currentDate.day() == 0 ? getFirstDay(currentDate.unix(), 7) : currentDate.day() == 1 ? currentDate.unix() : getFirstDay(currentDate.unix(), currentDate.day()) 
        console.log(firstDate )
        const weekIndex = moment.unix(firstDate).utc(true).week();


        const allDayInWeek = [];
        for(let i = 0; i < 7; i++){
            const nextDate = getNextDay(i, firstDate)
            
            if(isOutOfWeek(weekIndex, nextDate)){
                break
            }
            else{
                allDayInWeek.push(moment.unix(nextDate).utc(true).format("dddd DD/MM/YYYY"))
            }
        }
        console.log(allDayInWeek)

        return allDayInWeek
    }
    return (
        <UserContext.Consumer>


        {user =>(

        <View style={{flex: 1, display: 'flex', justifyContent: "center", alignItems: 'center'}}>
            {getAllDayInWeek(moment().format("DD/MM/YYYY")).map(val =>{
                return (<Text>{val}</Text>)
            })}
        </View>
        )}

        </UserContext.Consumer>
    )
}


export default ScheduleScreen