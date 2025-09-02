import { useTranslation } from "react-i18next";
import z from "zod/v3";

export const useSchemas = () => {
  const { t } = useTranslation();

  const baseSchema = {
    email: z.string().email({ message: t("zodSchemas.authSchema.email") }),
    password: z
      .string()
      .min(6, { message: t("zodSchemas.authSchema.password") }),
  };

  const loginSchema = z.object(baseSchema);

  const signupSchema = z
    .object({
      ...baseSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.confirmPassword === data.password, {
      path: ["confirmPassword"],
      message: t("zodSchemas.authSchema.confirmPassword"),
    });

  return { loginSchema, signupSchema };
};
