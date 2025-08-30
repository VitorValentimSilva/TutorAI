import { useContext } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export default function Input({
  label,
  placeholder,
  required,
  error,
  ...props
}: InputProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className={`w-full ${props.className ?? ""}`}>
      {label && (
        <Text className="text-gray-700 mb-2 text-base">
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

      <TextInput
        className={`border rounded-lg px-4 py-3 text-base ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
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
