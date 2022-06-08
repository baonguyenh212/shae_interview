/**
 * Created by NL on 07/06/2022.
 */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  createContainer,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryStack,
  VictoryTooltip,
} from 'victory-native';
import {deviceWidth} from '../../theme/Metrics';
import {Colors} from '../../theme';
import {LinesChart} from './constants';
import {Text} from '../../common';
import moment from 'moment';

export const CaloriesChart = ({
  activeBurned,
  workouts,
  handleChangeScrollAble,
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const yAxis = [0, 1000, 2000, 3000, 4000];

  const [isShowTooltip, setShowTooltip] = useState(false);
  const [touchLocationX, setTouchLocationX] = useState(0);

  const RenderInfo = e => {
    const {x, y, datum} = e;
    console.log('%c CaloriesChart1', 'color:#4AF82F', x, datum?.weekDay);
    if (datum?.weekDay) {
      const workoutCal =
        workouts.find(w => w.weekDay === datum.weekDay)?.value || 0;
      const activeBurnedCal =
        activeBurned.find(a => a.weekDay === datum.weekDay)?.value || 0;

      return (
        <View style={[styles.infoContainer, {left: x - 11}]}>
          <View>
            <Text textStyle={styles.blackText}>
              {workoutCal + activeBurnedCal}
            </Text>
            <View style={styles.unitContainer}>
              <Text textStyle={styles.grayText}>Kcal Burned</Text>
              <View style={styles.circle} />
              <Text textStyle={styles.grayText}>
                {moment(datum?.end || datum?.endDate).format('DD MMM')}
              </Text>
            </View>
          </View>
          {/*<View style={styles.triangle} />*/}
        </View>
      );
    }
    return null;
  };

  const VictoryVoronoiContainer = createContainer('voronoi');

  return (
    <View style={styles.container}>
      <View>
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
          {/*<VictoryLine*/}
          {/*  style={{*/}
          {/*    data: {stroke: Colors.chartLine},*/}
          {/*  }}*/}
          {/*  data={[*/}
          {/*    {x: 1, y: 1000},*/}
          {/*    {x: 1, y: 2000},*/}
          {/*    {x: 1, y: 3000},*/}
          {/*    {x: 1, y: 4000},*/}
          {/*    {x: 1, y: 4200},*/}
          {/*  ]}*/}
          {/*/>*/}
          {LinesChart.map((line, index) => (
            <VictoryLine
              key={index}
              style={{
                data: {stroke: Colors.chartLine},
              }}
              data={line}
            />
          ))}
          <VictoryStack>
            <VictoryBar
              // labels={() => ' '}
              // labelComponent={
              //   <VictoryTooltip
              //     // center={{x: 225, y: 30}}
              //     // pointerOrientation="bottom"
              //     // flyoutWidth={150}
              //     // flyoutHeight={50}
              //     // pointerWidth={30}
              //     // cornerRadius={0}
              //     renderInPortal={false}
              //     flyoutComponent={<RenderInfo />}
              //   />
              // }
              barRatio={0.3}
              style={{
                data: {fill: Colors.orange},
              }}
              data={activeBurned}
              x="weekDay"
              y="value"
              cornerRadius={{
                bottomLeft: 8,
                bottomRight: 8,
                topLeft: 3,
                topRight: 3,
              }}
            />
            <VictoryBar
              // events={[
              //   {
              //     target: 'data',
              //     eventHandlers: {
              //       onFocus: () => ({
              //         target: 'labels',
              //         mutation: () => ({active: true}),
              //       }),
              //       onBlur: () => ({
              //         target: 'labels',
              //         mutation: () => ({active: true}),
              //       }),
              //     },
              //   },
              // ]}
              // labels={() => ' '}
              // labelComponent={
              //   <VictoryTooltip
              //     // center={{x: 225, y: 30}}
              //     // pointerOrientation="bottom"
              //     // flyoutWidth={150}
              //     // flyoutHeight={50}
              //     // pointerWidth={30}
              //     // cornerRadius={0}
              //     renderInPortal={false}
              //     flyoutComponent={<RenderInfo />}
              //   />
              // }
              barRatio={0.3}
              style={{
                data: {fill: Colors.blue},
              }}
              data={workouts}
              x="weekDay"
              y="value"
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
    position: 'absolute',
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
