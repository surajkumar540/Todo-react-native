import React from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
type TaskProps = {
  task: {
    id: number;
    task: string;
    completed: boolean;
    createdAt: Date;
  };
  onToggle: () => void;
  onDelete: () => void;
};

const Task = ({task, onToggle, onDelete}: TaskProps) => {
  // Format the date to display relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <Animated.View style={styles.taskItem}>
      <View style={styles.taskLeftContent}>
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
          onPress={onToggle}>
          {task.completed && (
            <AntDesign name="checkcircle" size={20} color="blue" />
          )}
        </TouchableOpacity>
        <View style={styles.taskTextContainer}>
          <Text
            style={[
              styles.taskText,
              task.completed && styles.taskTextCompleted,
            ]}
            numberOfLines={2}>
            {task.task}
          </Text>
          <Text style={styles.taskTime}>{getRelativeTime(task.createdAt)}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <AntDesign name="delete" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Task;
