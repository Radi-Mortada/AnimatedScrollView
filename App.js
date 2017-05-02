import React, { Component } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

var BLACK = 0;
var RED = 1;
var BLUE = 2;


export default class ScrollableHeader extends Component {


  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }


  _renderScrollViewContent() {
    const data = Array.from({ length: 10 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    var bgColor = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgba(56, 45, 108, 1)', 'rgba(255, 255, 255, 0)']
    });

    return (
      <View style={styles.fill}>
        <Animated.View style={[styles.header, { backgroundColor: bgColor, height: headerHeight }]}>
          <View style={{ height: 100, marginHorizontal:10, backgroundColor:'red' }}>
            <Text style={styles.title}>Title</Text>
          </View>
        </Animated.View>
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}
        >
          {this._renderScrollViewContent()}
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});