import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Datepicker, Layout, Text } from '@ui-kitten/components';

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelect = (nextDate) => {
    setSelectedDate(nextDate);
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.calendarContainer}>
        
        <Datepicker
          date={selectedDate}
          onSelect={onSelect}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarContainer: {
    margin: 2,
  },
  text: {
    marginVertical: 8,
  },
});

export default DatePickerComponent;
