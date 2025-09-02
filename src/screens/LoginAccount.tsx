import { useContext } from "react";
import { View, Alert, ScrollView, Text, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import FormAuth from "../components/FormAuth";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../styles/colors";

type Props = {
  navigation: StackNavigationProp<any>;
};

export const LoginAccount = ({ navigation }: Props) => {
  const { signIn } = useAuth();
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signIn(values.email, values.password);
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Erro no login", getFirebaseErrorMessage(error.code, t));
    }
  };

  return (
    <LinearGradient
      colors={
        isDark
          ? [colors.secondaryDark, colors.primaryDark, colors.backgroundDark]
          : [colors.secondaryLight, colors.primaryLight, colors.backgroundLight]
      }
      className="flex-1 px-6"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex items-center pb-10">
          <Text
            className={`text-4xl text-center h-14
            ${isDark ? "text-textDark" : "text-text"}`}
          >
            {t("navigationPages.login.title")}
          </Text>

          <Text
            className={`text-base text-center 
            ${isDark ? "text-textDark" : "text-textLight"}`}
          >
            {t("navigationPages.login.subTitle")}
          </Text>
        </View>

        <View>
          <FormAuth
            isSignUp={false}
            onSubmit={handleSubmit}
            onSwitchMode={() => navigation.navigate("CreateAccount")}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
