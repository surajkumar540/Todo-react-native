import {Text, View} from 'react-native';
import {styles} from './Card.style';
import React from 'react';

const FlatCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text>Red</Text>
      </View>
      <View style={styles.container2}>
        <Text>Blue</Text>
      </View>
      <View style={styles.container2}>
        <Text>Blue</Text>
      </View>
    </View>
  );
};

export default FlatCard;
