import { useContext } from "react";
import { View, Alert, ScrollView, Text } from "react-native";
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
            onSwitchMode={() => navigation.navigate("CreateAccount")}
            onSubmit={async (values) => {
              try {
                await signIn(values.email, values.password);
                navigation.navigate("Home");
              } catch (error: any) {
                if (error.message === "EMAIL_NOT_VERIFIED") {
                  Alert.alert(
                    t("auth.emailNotVerifiedTitle"),
                    t("auth.emailNotVerifiedMessage")
                  );
                } else {
                  Alert.alert(
                    t("auth.loginErrorTitle"),
                    getFirebaseErrorMessage(error.code, t)
                  );
                }
              }
            }}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
