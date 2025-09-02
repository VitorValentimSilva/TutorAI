import { useContext } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import FormAuth from "../components/FormAuth";

type Props = {
  navigation: StackNavigationProp<any>;
};

export const CreateAccount = ({ navigation }: Props) => {
  const { signUp } = useAuth();
  const { isDark } = useContext(ThemeContext);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signUp(values.email, values.password);
      navigation.navigate("Home");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro no cadastro", "Este e-mail já está em uso.");
      } else {
        Alert.alert("Erro no cadastro", "Ocorreu um erro. Tente novamente.");
      }
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
            isSignUp={true}
            onSubmit={handleSubmit}
            onSwitchMode={() => navigation.navigate("LoginAccount")}
          />
        </View>

        <Text
          className={`text-center text-sm mt-4
          ${isDark ? "text-textDark" : "text-textLight"}`}
        >
          Ao criar uma conta você concorda com nossos Termos e Política de
          Privacidade
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
