import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';

type TabInputProps = {
  tasks: Array<any>; // You can replace `any` with a specific task type if available
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  activeCount: number;
  completedCount: number;
};

const Tabs = ({
  tasks,
  filter,
  setFilter,
  activeCount,
  completedCount,
}: TabInputProps) => {
  return (
    <View>
      {tasks.length > 0 && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            onPress={() => setFilter('all')}
            style={[
              styles.filterButton,
              filter === 'all' && styles.filterButtonActive,
            ]}>
            <Text
              style={[
                styles.filterText,
                filter === 'all' && styles.filterTextActive,
              ]}>
              All ({tasks.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('active')}
            style={[
              styles.filterButton,
              filter === 'active' && styles.filterButtonActive,
            ]}>
            <Text
              style={[
                styles.filterText,
                filter === 'active' && styles.filterTextActive,
              ]}>
              Active ({activeCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('completed')}
            style={[
              styles.filterButton,
              filter === 'completed' && styles.filterButtonActive,
            ]}>
            <Text
              style={[
                styles.filterText,
                filter === 'completed' && styles.filterTextActive,
              ]}>
              Completed ({completedCount})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Tabs;
