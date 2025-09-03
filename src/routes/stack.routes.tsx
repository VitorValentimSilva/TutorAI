import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./tab.routes";
import { CreateAccount } from "../screens/CreateAccount";
import { LoginAccount } from "../screens/LoginAccount";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="LoginAccount"
        component={LoginAccount}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Home"
        component={TabRoutes}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
}
