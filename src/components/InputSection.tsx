import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type InputSectionProps = {
  query: string;
  handleChange: (input: string) => void;
  handleSubmit: () => void;
};

const InputSection = ({
  query,
  handleChange,
  handleSubmit,
}: InputSectionProps) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animatedButtonWidth = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        Animated.timing(animatedButtonWidth, {
          toValue: 100,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.timing(animatedButtonWidth, {
          toValue: 60,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSubmit = () => {
    handleSubmit();
    Keyboard.dismiss();
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.writeTaskWrapper}>
      <View style={styles.inputContainer}>
        <FontAwesome
          name="tasks"
          size={18}
          color="#007AFF"
          style={styles.inputIcon}
        />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Add a task..."
          placeholderTextColor="#A9A9A9"
          value={query}
          onChangeText={handleChange}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
        />
      </View>

      {!keyboardVisible ? (
        <TouchableOpacity onPress={focusInput}>
          <View style={styles.addWrapper}>
            <AntDesign name="plus" size={24} color="#007AFF" />
          </View>
        </TouchableOpacity>
      ) : (
        <Animated.View
          style={[styles.submitButtonContainer, {width: animatedButtonWidth}]}>
          <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Add Task</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
};

export default InputSection;
