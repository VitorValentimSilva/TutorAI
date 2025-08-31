import { useContext } from "react";
import {
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function Input({
  label,
  placeholder,
  required,
  error,
  multiline = false,
  numberOfLines = 4,
  value,
  onChangeText,
  ...props
}: InputProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View>
      {label && (
        <Text
          className={`mb-2 text-base
          ${isDark ? "text-textDark" : "text-textLight"}`}
        >
          {label}
          {required && (
            <Text
              className={`${isDark ? "text-errorDark" : "text-errorLight"}`}
            >
              *
            </Text>
          )}
        </Text>
      )}

      <RNTextInput
        className={`border rounded-lg px-4 py-2 text-base w-full text-justify
        ${isDark ? "text-textDark" : "text-textLight"}
        ${error ? (isDark ? "border-errorDark" : "border-errorLight") : isDark ? "border-borderDark" : "border-borderLight"}`}
        placeholder={placeholder}
        placeholderTextColor={isDark ? colors.textDark : colors.textLight}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        textAlignVertical={multiline ? "top" : "center"}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />

      {error && (
        <Text
          className={`mt-1 text-sm
          ${isDark ? "text-errorDark" : "text-errorLight"}`}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
