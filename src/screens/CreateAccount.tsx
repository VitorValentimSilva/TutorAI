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

export const CreateAccount = ({ navigation }: Props) => {
  const { signUp } = useAuth();
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={
        isDark
          ? [colors.primaryDark, colors.secondaryDark, colors.backgroundDark]
          : [colors.primaryLight, colors.secondaryLight, colors.backgroundLight]
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
            ${isDark ? "text-textDark" : "text-textLight"}`}
          >
            {t("navigationPages.createAccount.title")}
          </Text>

          <Text
            className={`text-base text-center 
            ${isDark ? "text-textDark" : "text-textLight"}`}
          >
            {t("navigationPages.createAccount.subTitle")}
          </Text>
        </View>

        <View>
          <FormAuth
            isSignUp={true}
            onSwitchMode={() => navigation.navigate("LoginAccount")}
            onSubmit={async (values) => {
              try {
                await signUp(values.email, values.password);
                Alert.alert(
                  t("auth.verifyEmailTitle"),
                  t("auth.verifyEmailMessage")
                );
                navigation.replace("LoginAccount");
              } catch (error: any) {
                Alert.alert(
                  t("auth.signUpErrorTitle"),
                  getFirebaseErrorMessage(error.code, t)
                );
              }
            }}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
