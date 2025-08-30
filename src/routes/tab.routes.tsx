import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import Quizzes from "../screens/Quizzes";
import History from "../screens/History";

import CustomHeader from "../components/CustomHeader";
import {
  Ionicons,
  FontAwesome5,
  FontAwesome6,
  FontAwesome,
} from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";

const Tab = createBottomTabNavigator();

function makeHeaderOptions({
  tabIcon,
  headerIcon,
  title,
  subtitle,
  backgroundColorHex,
}: {
  tabIcon: (props: { focused: boolean; color: string }) => React.ReactNode;
  headerIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  backgroundColorHex?: string;
}) {
  return {
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) =>
      tabIcon({ focused, color }),
    headerTitle: () => (
      <CustomHeader icon={headerIcon} title={title} subtitle={subtitle} />
    ),
    headerStyle: {
      backgroundColor: backgroundColorHex,
      height: 135,
    },
    headerTitleAlign: "center" as const,
  };
}

export default function TabRoutes() {
  const { isDark } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark
            ? colors.backgroundDark
            : colors.backgroundLight,
          borderTopWidth: 1,
          borderColor: isDark ? colors.borderDark : colors.borderLight,
          height: 62,
          paddingTop: 3,
        },
        tabBarActiveTintColor: isDark
          ? colors.primaryDark
          : colors.primaryLight,
        tabBarInactiveTintColor: isDark
          ? colors.textInverseDark
          : colors.textLight,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={makeHeaderOptions({
          tabIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name="chatbubble" size={22} color={color} />
            ) : (
              <Ionicons name="chatbubble-outline" size={22} color={color} />
            ),
          headerIcon: (
            <Ionicons
              name="sparkles"
              size={24}
              color={isDark ? colors.textInverseDark : colors.textInverseLight}
            />
          ),
          title: "TutorAI",
          subtitle: "Seu tutor pessoal",
          backgroundColorHex: `${isDark ? colors.primaryDark : colors.primaryLight}`,
        })}
      />

      <Tab.Screen
        name="Quizzes"
        component={Quizzes}
        options={makeHeaderOptions({
          tabIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name="school" size={26} color={color} />
            ) : (
              <Ionicons name="school-outline" size={26} color={color} />
            ),
          headerIcon: (
            <FontAwesome6
              name="brain"
              size={24}
              color={isDark ? colors.textInverseDark : colors.textInverseLight}
            />
          ),
          title: "Quizzes",
          subtitle: "Teste seus conhecimentos",
          backgroundColorHex: `${isDark ? colors.secondaryDark : colors.secondaryLight}`,
        })}
      />

      <Tab.Screen
        name="Histórico"
        component={History}
        options={makeHeaderOptions({
          tabIcon: ({ color }) => (
            <FontAwesome5 name="history" size={22} color={color} />
          ),
          headerIcon: (
            <FontAwesome5
              name="history"
              size={24}
              color={isDark ? colors.textInverseDark : colors.textInverseLight}
            />
          ),
          title: "Histórico",
          subtitle: "Acompanhe seu progresso",
          backgroundColorHex: `${isDark ? colors.tertiaryDark : colors.tertiaryLight}`,
        })}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) =>
            focused ? (
              <FontAwesome name="user" size={28} color={color} />
            ) : (
              <FontAwesome name="user-o" size={22} color={color} />
            ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
