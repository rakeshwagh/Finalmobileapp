import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StripeApp from "../screens/user/StripeApp";

export default function SignInStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Payment" component={Payment} /> */}
      <Stack.Screen name="StripeApp" component={StripeApp} />
      {/* <Stack.Screen name="PaymentScreen" component={PaymentScreen} /> */}
    </Stack.Navigator>
  );
}
