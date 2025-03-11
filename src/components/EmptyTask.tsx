import {Image, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';

const EmptyTask = () => {
  return (
    <View style={styles.noTaskContainer}>
      <Image
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/016/349/593/non_2x/empty-folder-no-result-data-not-found-concept-illustration-flat-design-eps10-simple-and-modern-graphic-element-for-landing-page-ui-infographic-etc-vector.jpg',
        }}
        style={styles.noTaskImage}
      />
      <Text style={styles.noTaskText}>No tasks yet</Text>
      <Text style={styles.noTaskSubText}>Add a task to get started</Text>
    </View>
  );
};

export default EmptyTask;
