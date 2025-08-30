import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./stack.routes";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function Routes() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
