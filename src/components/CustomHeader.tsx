import { SafeAreaView, Text, View } from "react-native";

interface CustomHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  backgroundClass?: string;
}

export default function CustomHeader({
  icon,
  title,
  subtitle,
  backgroundClass = "bg-[#3B82F6]",
}: CustomHeaderProps) {
  return (
    <SafeAreaView className={`${backgroundClass} w-full`}>
      <View className="items-center justify-center">
        {icon}
        <Text className="text-white text-[20px] font-extrabold pt-1">
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-[#e6f0ff] text-[12px] pt-1">{subtitle}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
