import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./stack.routes";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function Routes() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NavigationContainer>
            <StackRoutes />
          </NavigationContainer>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
