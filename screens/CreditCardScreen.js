import React, { Component } from "react";
import {
  ScrollView,
  Text,
  DatePickerIOS,
  TouchableOpacity,
  Alert
} from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SubmitButton from "../components/SubmitButton";
import { saveCreditCard } from "../actions";

class CreditCardScreen extends Component {
  state = {
    chosenDate: new Date(),
    card: {
      name: "",
      number: "",
      exp_month: "",
      exp_year: "",
      cvc: ""
    }
  };
  // contains a form to submit new credit card info
  // save this to redux-store
  _setCardInfo = (text, key) => {
    this.setState({ card: { ...this.state.card, [key]: text } });
  };

  _setDate = newDate => {
    this.setState({
      chosenDate: newDate,
      card: {
        ...this.state.card,
        exp_month: newDate.getMonth() + 1,
        exp_year: newDate.getFullYear()
      }
    });
  };
  // REFACTOR: return the user to the page from where he was before (pop the navigation stack)
  _submitCreditCardInfo = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Account" })]
    });
    this.props.saveCreditCard(this.state.card);
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate(
      this.props.navigation.state.params.returnToScreen
    );
  };

  render() {
    // REFACTOR: add error handling/messages and regex check
    return (
      <KeyboardAwareScrollView>
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={text => this._setCardInfo(text, "name")} />

        <FormLabel>Card Number</FormLabel>
        <FormInput onChangeText={text => this._setCardInfo(text, "number")} />

        <FormLabel>Expiry Date</FormLabel>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this._setDate}
          mode="date"
        />

        <FormLabel>CVC</FormLabel>
        <FormInput
          secureTextInput={true}
          onChangeText={text => this._setCardInfo(text, "cvc")}
        />

        <SubmitButton onPress={this._submitCreditCardInfo} />
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, { saveCreditCard })(CreditCardScreen);
