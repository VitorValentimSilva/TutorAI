import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({ onPress, disabled = false }: ButtonProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-12 h-12 rounded-full flex items-center justify-center`}
      style={{
        backgroundColor: disabled
          ? isDark
            ? colors.borderDark
            : colors.borderLight
          : isDark
            ? colors.primaryDark
            : colors.primaryLight,
      }}
      activeOpacity={0.7}
    >
      <Ionicons
        name="send"
        size={20}
        color={isDark ? colors.textInverseDark : colors.textInverseLight}
      />
    </TouchableOpacity>
  );
}
