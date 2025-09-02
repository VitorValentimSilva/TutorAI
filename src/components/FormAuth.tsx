import { View, Pressable, Text } from "react-native";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import { useSchemas } from "../schemas/authSchema";
import { useTranslation } from "react-i18next";

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
  const { loginSchema, signupSchema } = useSchemas();
  const schema = isSignUp ? signupSchema : loginSchema;
  const { t } = useTranslation();

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
        className={`w-full p-6 rounded-2xl
        ${isDark ? "bg-surfaceDark" : "bg-surfaceLight"}`}
      >
        <Controller
          control={methods.control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              label={t("inputs.inputEmail")}
              placeholder={t("inputs.placeholderEmail")}
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
              label={t("inputs.inputPassword")}
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
                label={t("inputs.inputConfirmPassword")}
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

        {!isSignUp && (
          <View className="flex flex-row items-center justify-between w-full">
            <View>
              <Text
                className={`text-sm
                ${isDark ? "text-textDark/60" : "text-textLight/60"}`}
              >
                {t("navigationPages.login.rememberMe")}
              </Text>
            </View>

            <Pressable>
              <Text
                className={`text-sm
                ${isDark ? "text-secondaryDark" : "text-secondaryLight"}`}
              >
                {t("navigationPages.login.forgotPassword")}
              </Text>
            </Pressable>
          </View>
        )}

        <View
          className={`mt-7 w-full items-center rounded-xl py-4
          ${isDark ? "bg-primaryDark" : "bg-primaryLight"}`}
        >
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text
              className={`text-base font-semibold
              ${isDark ? "text-textDark" : "text-textLight"}`}
            >
              {isSignUp
                ? `${t("navigationPages.createAccount.buttonText")}`
                : `${t("navigationPages.login.buttonText")}`}
            </Text>
          </Pressable>
        </View>

        <View className="my-7 flex-row items-center">
          <View
            className={`flex-1 h-px 
            ${isDark ? "bg-borderDark" : "bg-borderLight"}`}
          />

          <Text
            className={`mx-4 text-center text-base
            ${isDark ? "text-textDark/80" : "text-textLight/80"}`}
          >
            {isSignUp
              ? `${t("navigationPages.createAccount.orWith")}`
              : `${t("navigationPages.login.orWith")}`}
          </Text>

          <View
            className={`flex-1 h-px 
            ${isDark ? "bg-borderDark" : "bg-borderLight"}`}
          />
        </View>

        <View className="flex flex-row items-center gap-2 justify-center">
          <Text
            className={`text-base
            ${isDark ? "text-textDark/80" : "text-textLight/80"}`}
          >
            {isSignUp
              ? `${t("navigationPages.createAccount.haveAccount1")}`
              : `${t("navigationPages.login.haveAccount1")}`}
          </Text>

          <Pressable onPress={onSwitchMode}>
            <Text
              className={`text-base
              ${isDark ? "text-primaryDark" : "text-primaryLight"}`}
            >
              {isSignUp
                ? `${t("navigationPages.createAccount.haveAccount2")}`
                : `${t("navigationPages.login.haveAccount2")}`}
            </Text>
          </Pressable>
        </View>
      </View>
    </FormProvider>
  );
}
