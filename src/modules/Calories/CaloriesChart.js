/**
 * Created by NL on 07/06/2022.
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryStack,
} from 'victory-native';
import {deviceWidth} from '../../theme/Metrics';
import {Colors, Images} from '../../theme';
import {LinesChart} from './constants';
import {Text} from '../../common';
import FastImage from 'react-native-fast-image';

export const CaloriesChart = props => {
  const data2012 = [
    {quarter: 1, earnings: 1793},
    {quarter: 2, earnings: 1900},
    {quarter: 3, earnings: 2000},
    {quarter: 4, earnings: 2100},
    {quarter: 5, earnings: 2200},
    {quarter: 6, earnings: 2300},
    {quarter: 7, earnings: 2400},
  ];

  const data2013 = [
    {quarter: 1, earnings: 587},
    {quarter: 2, earnings: 587},
    {quarter: 3, earnings: 587},
    {quarter: 4, earnings: 587},
    {quarter: 5, earnings: 587},
    {quarter: 6, earnings: 587},
    {quarter: 7, earnings: 587},
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const yAxis = [0, 1000, 2000, 3000, 4000];

  const renderInfo = () => {
    return (
      <View style={styles.infoContainer}>
        <View>
          <Text textStyle={styles.blackText}>2,380</Text>
          <View style={styles.unitContainer}>
            <Text textStyle={styles.grayText}>Kcal Burned</Text>
            <View style={styles.circle} />
            <Text textStyle={styles.grayText}>08 Dec</Text>
          </View>
        </View>
        <View style={styles.triangle} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        {renderInfo()}
        <VictoryChart
          padding={{left: 28, right: 50, top: 20, bottom: 50}}
          width={deviceWidth()}>
          <VictoryAxis
            dependentAxis
            tickValues={yAxis}
            tickFormat={x => (x === 0 ? '0' : `${x / 1000}k`)}
            style={{
              axis: {stroke: 'none'},
              tickLabels: {
                fill: Colors.grayText,
              },
            }}
          />
          <VictoryAxis
            domainPadding={{x: [15, 0]}}
            tickValues={weekDays}
            style={{
              axis: {stroke: 'none'},
              tickLabels: {
                fill: Colors.grayText,
              },
            }}
          />
          <VictoryLine
            style={{
              data: {stroke: Colors.chartLine},
            }}
            data={[
              {x: 1, y: 1000},
              {x: 1, y: 2000},
              {x: 1, y: 3000},
              {x: 1, y: 4000},
              {x: 1, y: 4200},
            ]}
          />
          {LinesChart.map(line => (
            <VictoryLine
              style={{
                data: {stroke: Colors.chartLine},
              }}
              data={line}
            />
          ))}

          <VictoryStack>
            <VictoryBar
              style={{
                data: {fill: Colors.orange},
              }}
              data={data2012}
              x="quarter"
              y="earnings"
              cornerRadius={{
                bottomLeft: 8,
                bottomRight: 8,
                topLeft: 3,
                topRight: 3,
              }}
            />
            <VictoryBar
              style={{
                data: {fill: Colors.blue},
              }}
              data={data2013}
              x="quarter"
              y="earnings"
              cornerRadius={{
                bottomLeft: 3,
                bottomRight: 3,
                topLeft: 8,
                topRight: 8,
              }}
            />
          </VictoryStack>
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  circle: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.gray,
    marginHorizontal: 12,
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grayText: {
    fontSize: 13,
    color: Colors.grayText,
  },
  blackText: {
    fontSize: 32,
    color: Colors.blackText,
  },
  infoContainer: {
    width: 200,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
    marginTop: 15,
    shadowColor: Colors.black,
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    paddingVertical: 15,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'transparent',
    borderRightWidth: 20,
    borderRightColor: 'transparent',
    borderTopColor: Colors.white,
    borderTopWidth: 16,
    position: 'absolute',
    bottom: -15,
    left: 20,
    // shadowColor: Colors.black,
    // shadowRadius: 5,
    // elevation: 0,
    // shadowOpacity: 0.1,
    // shadowOffset: {width: 0, height: 3},
    // zIndex: 0,
  },
});
