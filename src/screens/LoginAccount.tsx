import { useContext } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import FormAuth from "../components/FormAuth";

type Props = {
  navigation: StackNavigationProp<any>;
};

export const LoginAccount = ({ navigation }: Props) => {
  const { signIn } = useAuth();
  const { isDark } = useContext(ThemeContext);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signIn(values.email, values.password);
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Erro no login", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 px-5 pt-12 
      ${isDark ? "bg-backgroundDark" : "bg-backgroundLight"}`}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="items-center"></View>

        <View>
          <FormAuth
            isSignUp={false}
            onSubmit={handleSubmit}
            onSwitchMode={() => navigation.navigate("CreateAccount")}
          />
        </View>

        <Pressable>
          <Text
            className={`text-center text-base mt-5
            ${isDark ? "text-secondaryDark" : "text-secondaryLight"}`}
          >
            Esqueceu sua senha?
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
