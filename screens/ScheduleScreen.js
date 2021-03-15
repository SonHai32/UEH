import React, {useState} from 'react';
import moment from 'moment';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {UserContext} from '../components/context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppBar from '../components/Layouts/AppBar';

import {COLORS, SIZES} from '../constants/theme';
const ScheduleScreen = ({navigation}) => {
  const getAllDayInWeek = (date) => {
    const DAY_TO_SECONDS = 24 * 60 * 60;

    //customize first day of week is Monday

    const getFirstDay = (dayUnix, prevDay) => {
      return dayUnix - (prevDay - 1) * DAY_TO_SECONDS;
      // prevDay -1 | Sunday begin at 0
    };

    const getNextDay = (step, dayUnix) => {
      return dayUnix + step * DAY_TO_SECONDS;
    };

    const isOutOfWeek = (weekIndex, dayUnix) => {
      return moment.unix(dayUnix).utc(true).week() !== weekIndex;
    };
    const currentDate = moment(date, 'DD/MM/YYYY');
    const firstDate =
      currentDate.day() == 0
        ? getFirstDay(currentDate.unix(), 7)
        : currentDate.day() == 1
        ? currentDate.unix()
        : getFirstDay(currentDate.unix(), currentDate.day());
    console.log(firstDate);
    const weekIndex = moment.unix(firstDate).utc(true).week();

    const allDayInWeek = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = getNextDay(i, firstDate);

      if (isOutOfWeek(weekIndex, nextDate)) {
        break;
      } else {
        allDayInWeek.push(moment.unix(nextDate).utc(true).format('DD/MM/YYYY'));
      }
    }
    console.log(allDayInWeek);

    return allDayInWeek;
  };

  
  const styles = StyleSheet.create({
    container: {
      flex: 2,
    },
    scheduleItemContainer: {
      borderRadius: 28,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    scheduleItemHeader: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scheduleItemContent: {
      paddingHorizontal: 20,
      flex: 3,
      display: 'flex',
      flexDirection: 'row',
    },
    scheduleItemContentLabel: {
      color: COLORS.darkGray,
      fontSize: SIZES.h4,
      fontWeight: '800',
      flex: 1,
    },
    scheduleItemContentValue: {
      flex: 1,
      color: COLORS.darkGray,
      fontSize: SIZES.h4,
      fontWeight: '600',
    },
    textHeader: {
      fontSize: SIZES.h2,
      color: COLORS.black,
      fontWeight: '800',
      marginTop: 10,
    },
    controlWeekIndexContainer: {
      height: 60,
      display: 'flex',
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

  const RenderSchedule = ({schedule, weekIndex}) => {
    moment.updateLocale('en', {
      weekdays: [
        'Chủ nhật',
        'Thứ 2',
        'Thứ 3',
        'Thứ 4',
        'Thứ 5',
        'Thứ 6',
        'Thứ 7',
      ],
    });

    const scheduleFilter = schedule.filter((val, index) => {
      return val.weekIndex == weekIndex;
    });

    const RenderScheduleItemContent = ({schedule}) => {
      return Object.keys(schedule).map((val) => {
        return (
          <View style={styles.scheduleItemContent}>
            <Text style={styles.scheduleItemContentLabel}>
              {val === 'subjectName'
                ? 'Môn học : '
                : val === 'room'
                ? 'Phòng : '
                : val === 'startAt'
                ? 'Giờ bắt đầu : '
                : val === 'endAt'
                ? 'Giờ kết thúc : '
                : null}
            </Text>
            <Text style={styles.scheduleItemContentValue}>
              {val === 'subjectName'
                ? schedule['subjectName']
                : val === 'room'
                ? schedule['room']
                : val === 'startAt'
                ? schedule['startAt']
                : val === 'endAt'
                ? schedule['endAt']
                : null}
            </Text>
          </View>
        );
      });
    };

    

    const CURRENT_DATE = moment().format('DD/MM/YYYY');
    return (
      <FlatGrid
        itemDimension={200}
        data={scheduleFilter}
        spacing={30}
        renderItem={({item}) => {
          const date = moment(item.date, 'DD/MM/YYYY').format('DD/MM/YYYY');
          return (
            <LinearGradient
              colors={COLORS.glass}
              style={styles.scheduleItemContainer}>
              <View style={styles.scheduleItemHeader}>
                <Text
                  style={{
                    ...styles.textHeader,
                    color: date == CURRENT_DATE ? COLORS.pink : null,
                  }}>
                  {moment(item.date, 'DD/MM/YYYY').format('dddd DD/MM/YYYY')}
                </Text>
              </View>
              <RenderScheduleItemContent schedule={item} />
            </LinearGradient>
          );
        }}
      />
    );
  };

  const [currentWeekIndex, setCurrentWeekIndex] = useState(moment().week() + 1);
const handleWeekIndex = (option) =>{
        if(option === 'next'){
            setCurrentWeekIndex(prevWeekIndex => prevWeekIndex + 1)
        }else{
            setCurrentWeekIndex(prevWeekIndex => prevWeekIndex - 1)
        }
    } 
  return (
    <UserContext.Consumer>
      {(user) => (
        <LinearGradient
          colors={COLORS.background}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.container}>
          <LinearGradient
            colors={COLORS.glass}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.container}>
            <LinearGradient
              colors={COLORS.glass}
              start={{x: 1, y: 0}}
              end={{x: 0.4, y: 1}}
              style={styles.container}>
              <AppBar
                navigate={'Dashboard'}
                navigation={navigation}
                title={'Lịch học'}
              />
              <View style={styles.controlWeekIndexContainer}>
                <TouchableOpacity onPress={() => handleWeekIndex('prev')}>
                  <Ionicons
                    name="arrow-back-outline"
                    size={32}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.pink_2,
                    fontSize: SIZES.h2,
                    fontWeight: '900',
                  }}>
                  Tuần {currentWeekIndex}{' '}
                </Text>

                <TouchableOpacity onPress={() => handleWeekIndex('next')}>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={32}
                    color={COLORS.darkGray}
                  />
                </TouchableOpacity>
              </View>
              <RenderSchedule
                schedule={user.schedule}
                weekIndex={currentWeekIndex}
              />
            </LinearGradient>
          </LinearGradient>
        </LinearGradient>
      )}
    </UserContext.Consumer>
  );
};

export default ScheduleScreen;
