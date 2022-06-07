/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Header} from './src/common';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  CaloriesButton,
  CaloriesWeekComponent,
} from './src/modules/Calories/component';
import {responsiveHeight, responsiveWidth} from './src/theme/Metrics';
import {Colors, Images} from './src/theme';
import {CaloriesChart} from './src/modules/Calories';
import {getLessons, getMessageTypes} from './src/utilities/APIManage';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const fetchMessageTypes = () => {
    getMessageTypes().then(res => {
      Alert.alert('Fetching API success', `URL: ${res?.url}`);
    });
  };

  const fetchLessons = () => {
    getLessons().then(res => {
      Alert.alert('Fetching API success', `URL: ${res?.intro}`);
    });
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header title={'Calories Burned'} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <CaloriesWeekComponent />
        <CaloriesChart />
        <CaloriesButton
          icon={Images.calories.inActive}
          text={'In-Active Calories Burned'}
          value={'1793'}
          unit={'BPM'}
          onPress={fetchMessageTypes}
        />
        <CaloriesButton
          containerStyle={{
            marginTop: responsiveHeight(16),
          }}
          icon={Images.calories.workout}
          text={'Workout Calories Burned'}
          value={'587'}
          onPress={fetchLessons}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: responsiveHeight(24),
  },
});

export default App;
