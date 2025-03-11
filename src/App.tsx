import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Task from './components/Task';
import {styles} from './components/styles';
import InputSection from './components/InputSection';
import Tabs from './components/Tabs';
import EmptyTask from './components/EmptyTask';

type TaskType = {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
};

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Load tasks from storage on app init
  useEffect(() => {
    // Simulate loading tasks from storage
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 300);
  }, [fadeAnim]);

  const handleChange = (input: string) => {
    setQuery(input);
  };

  const handleSubmit = () => {
    if (!query.trim()) {
      Alert.alert('Empty Task', 'Please enter a task');
      return;
    }

    const newTask = {
      id: Date.now(),
      task: query.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTasks([...tasks, newTask]);
    setQuery('');

    // Scroll to the bottom after adding a new task
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => {
          setTasks(tasks.filter(task => task.id !== id));
        },
        style: 'destructive',
      },
    ]);
  };

  const clearCompletedTasks = () => {
    if (tasks.filter(task => task.completed).length === 0) {
      Alert.alert(
        'No Completed Tasks',
        'There are no completed tasks to clear',
      );
      return;
    }

    Alert.alert(
      'Clear Completed',
      'Are you sure you want to clear all completed tasks?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          onPress: () => {
            setTasks(tasks.filter(task => !task.completed));
          },
          style: 'destructive',
        },
      ],
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <Animated.View style={[styles.taskWrapper, {opacity: fadeAnim}]}>
        {/* Heading */}
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>My Tasks</Text>
          {tasks.length > 0 && (
            <TouchableOpacity onPress={clearCompletedTasks}>
              <Text style={styles.clearButton}>Clear Completed</Text>
            </TouchableOpacity>
          )}
        </View>

        <Tabs
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {tasks.length === 0 ? (
            <EmptyTask />
          ) : filteredTasks.length === 0 ? (
            <View style={styles.noTaskContainer}>
              <Text style={styles.noTaskText}>No {filter} tasks found</Text>
            </View>
          ) : (
            <View style={styles.items}>
              {filteredTasks.map(item => (
                <Task
                  key={item.id}
                  task={item}
                  onToggle={() => toggleTaskCompletion(item.id)}
                  onDelete={() => deleteTask(item.id)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </Animated.View>

      <InputSection
        query={query}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </KeyboardAvoidingView>
  );
};

export default App;
