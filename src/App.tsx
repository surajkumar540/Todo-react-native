import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FlatCard from './components/Cards/FlatCard';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.headingText}>
        <Text>Flat Card</Text>
        <FlatCard />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});
