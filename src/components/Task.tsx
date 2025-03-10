import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type TaskProps = {
  text: string;
};

const Task: React.FC<TaskProps> = ({text}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square} />
        <Text style={styles.textCap}>{text}</Text>
      </View>
      <View style={styles.circular} />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textCap: {textTransform: 'capitalize'},
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});
