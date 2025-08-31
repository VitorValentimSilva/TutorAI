import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./stack.routes";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

export default function Routes() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          <StackRoutes />
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
}
