import React, { Component } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const SEARCH_MAX_HEIGHT = 50;
const SEARCH_MIN_HEIGHT = 30;
const SEARCH_SCROLL_DISTANCE = SEARCH_MAX_HEIGHT - SEARCH_MIN_HEIGHT;

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
    const data = Array.from({ length: 30 });
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

    const searchHeight = this.state.scrollY.interpolate({
      inputRange: [0, SEARCH_SCROLL_DISTANCE],
      outputRange: [SEARCH_MAX_HEIGHT, SEARCH_MIN_HEIGHT],
      extrapolate: 'clamp',
    });


    var bgColor = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgba(56, 45, 108, 1)', 'rgba(255, 255, 255, 0)']
    });

    return (
      <View style={styles.fill}>
        <View style={{ height: 22, backgroundColor: 'transparent' }}></View>
        <Animated.View style={{ elevation:4,flexDirection: 'row', alignItems: 'center', height: 50, position: 'absolute', left: 10, right: 10, zIndex: 10, top: searchHeight, backgroundColor: 'white' }}>
          <Image source={{ uri: 'http://www.freeiconspng.com/uploads/search-icon-png-2.png' }} style={{ marginLeft: 5, height: 30, width: 30 }} />
          <TextInput
            style={{ flex: 1, height: 40, marginHorizontal: 5 }}
            underlineColorAndroid='transparent'
            placeholder='Find your deal !'
          />
          <Image source={{ uri: 'http://www.haotu.net/up/3358/512/98-Camera.png' }} style={{ marginRight: 5, height: 30, width: 30 }} />

        </Animated.View>
        <Animated.View style={[styles.header, { backgroundColor: bgColor, height: headerHeight }]}>

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