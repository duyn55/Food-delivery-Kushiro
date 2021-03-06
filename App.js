import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { View } from "react-native";
import { Provider } from "react-redux";

// refactor: we should call Foursquare APIs ourselves and create a different random menu for each restaurant everytime user log to the app
import MapScreen from "./screens/MapScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import AccountScreen from "./screens/AccountScreen";
import SummaryScreen from "./screens/SummaryScreen";
import CreditCardScreen from "./screens/CreditCardScreen";
import reducers from "./reducers";
import { store, persistor } from "./store";

const RootStack = createBottomTabNavigator(
  {
    Welcome: WelcomeScreen,
    Main: createBottomTabNavigator(
      {
        Info: createStackNavigator({
          Account: AccountScreen,
          CreditCard: CreditCardScreen
        }),
        Order: createStackNavigator({
          Map: MapScreen,
          OrderDetail: OrderDetailScreen,
          Checkout: CheckoutScreen
        }),
        Summary: SummaryScreen
      },
      {
        navigationOptions: {
          tabBarVisible: true
        }
      }
    )
  },
  {
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <RootStack />
        </View>
      </Provider>
    );
  }
}
