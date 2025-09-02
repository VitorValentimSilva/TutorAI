import { View, Pressable, Text } from "react-native";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { loginSchema, signupSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";

type Props = {
  isSignUp: boolean;
  onSubmit: (values: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => void;
  onSwitchMode: () => void;
};

type FormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function FormAuth({ isSignUp, onSubmit, onSwitchMode }: Props) {
  const { isDark } = useContext(ThemeContext);
  const schema = isSignUp ? signupSchema : loginSchema;

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", confirmPassword: "" } as any,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <View
        className={`w-full px-5 py-4 rounded-2xl
        ${isDark ? "bg-surfaceDark" : "bg-surfaceLight"}`}
      >
        <Text
          className={`text-3xl font-bold mb-6 text-center
          ${isDark ? "text-textDark" : "text-textLight"}`}
        >
          {isSignUp ? "Criar Nova Conta" : "Bem-vindo de Volta"}
        </Text>

        <Controller
          control={methods.control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              label="E-mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={methods.control}
          name="password"
          render={({ field, fieldState }) => (
            <Input
              label="Senha"
              placeholder="••••••"
              secureTextEntry
              autoCapitalize="none"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        {isSignUp && (
          <Controller
            control={methods.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Input
                label="Confirme a Senha"
                placeholder="••••••"
                secureTextEntry
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        )}

        <View className="mt-5">
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text
              className={`text-base font-semibold
              ${isDark ? "text-textDark" : "text-textLight"}`}
            >
              {isSignUp ? "Criar Conta" : "Entrar"}
            </Text>
          </Pressable>

          <View
            className={`flex-row items-center justify-center my-3 border-t
            ${isDark ? "border-borderDark" : "border-borderLight"}`}
          ></View>

          <Pressable onPress={onSwitchMode}>
            <Text
              className={`text-base font-semibold
              ${isDark ? "text-primaryDark" : "text-primaryLight"}`}
            >
              {isSignUp ? "Já tem uma conta? Entrar" : "Criar nova conta"}
            </Text>
          </Pressable>
        </View>
      </View>
    </FormProvider>
  );
}
