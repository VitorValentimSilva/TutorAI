import { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

interface CustomHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function CustomHeader({
  icon,
  title,
  subtitle,
}: CustomHeaderProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView className="w-full">
      <View className="items-center justify-center">
        {icon}
        <Text
          className={`text-[20px] font-extrabold pt-1
          ${isDark ? "text-textInverseDark" : "text-textInverseLight"}`}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            className={`text-[12px] pt-1
            ${isDark ? "text-textInverseDark" : "text-textInverseLight"}`}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
