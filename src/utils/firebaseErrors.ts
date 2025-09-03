export const getFirebaseErrorMessage = (
  code: string,
  t: (key: string) => string
) => {
  const firebaseErrors: Record<string, string> = {
    "auth/invalid-credential": t("firebaseErrors.auth.invalidCredential"),
    "auth/user-not-found": t("firebaseErrors.auth.userNotFound"),
    "auth/wrong-password": t("firebaseErrors.auth.wrongPassword"),
    "auth/email-already-in-use": t("firebaseErrors.auth.emailAlreadyInUse"),
    "auth/too-many-requests": t("firebaseErrors.auth.tooManyRequests"),
    "auth/network-request-failed": t("firebaseErrors.auth.networkError"),
    "auth/invalid-email": t("firebaseErrors.auth.invalidEmail"),
    "auth/weak-password": t("firebaseErrors.auth.weakPassword"),
  };

  return firebaseErrors[code] || t("firebaseErrors.error");
};
