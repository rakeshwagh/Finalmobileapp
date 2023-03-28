import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http:IP/stripe/payment-intent';
const VERIFY_URL = 'http:IP/stripe/verify-payment';

const StripeApp = () => {
  const [amount, setAmount] = useState('');
  const [cardDetails, setCardDetails] = useState({});
  const [processingPayment, setProcessingPayment] = useState(false);
  const stripe = useStripe();
  const navigation=useNavigation();

  const handlePayNow= async (navigation) => {
    setProcessingPayment(true);
    try{
      const name = "Rakesh Wagh";
      const finalAmount = amount;
      const response = await axios.post(API_URL,{amount:amount,name});
      const  data = response.data;
      const {client_secret,id} = data.clientSecret;
      const clientSecret = client_secret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName:"Chakki - Fresh Flour Aata Delievery"
      });

      if (initSheet.error) {
        console.error(initSheet.error);
        setProcessingPayment(false);
        console.log(initSheet.error.message);
        // return Alert.alert(initSheet.error.message);
      }
      
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: clientSecret,
      });

      if (presentSheet.error) {
        console.error(presentSheet.error);
        setProcessingPayment(false);
        console.log(presentSheet.error.message);
        // return Alert.alert(presentSheet.error.message);
      }
      console.log("Payment Succesfull");

      // Payment Validation Started

      console.log(id);
      const verifyPayment = await axios.post(VERIFY_URL,{id});
      // Navigate to success screen 
      
      // console.log(verifyPayment);

      // Alert.alert("Payment Succesfull");
      setProcessingPayment(false);
      
    }
    catch(err){
      console.error(err);
      // Alert.alert("Payment failed!");
      console.log("Payment Failed");
      setProcessingPayment(false);
    }
  }

  // const handlePayNow = async () => {
  //   setProcessingPayment(true);
  //   // const response = await fetch(API_URL, {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   //   body: JSON.stringify({ amount ,currency:'INR'}),
  //   // });

  //   try{
  //     const response = await axios.post(API_URL,{amount,currency:"INR"});
  //     const {clientSecret} = response.data;
  //     console.log("ClientSecret => " ,  clientSecret);
  //     const initPayment = await stripe.presentPaymentSheet({clientSecret:clientSecret});
  //     // const paymentConfirmation = await confirmPayment(clientSecret, {
  //     //   type: 'Card',
  //     //   billingDetails: {
  //     //     name: cardDetails.name,
  //     //     email: cardDetails.email,
  //     //   },
  //     // });
  //     console.log("payment Successfull => ", initPayment);
  //     setProcessingPayment(false);
  //   }
  //   catch(err){
  //     console.log("Payment Faild: " , err.message);
  //     setProcessingPayment(false);
  //   }
    
  // };

  const handleCardDetailsChange = (cardDetails) => {
    setCardDetails(cardDetails);
  };

  return (
    <StripeProvider publishableKey="#publishablekey">
      <View style={styles.container}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <CardField
          style={styles.cardField}
          onCardChange={handleCardDetailsChange}
          postalCodeEnabled={false}
        />
        <Button
          title={processingPayment ? 'Processing...' : 'Pay Now'}
          onPress={handlePayNow}
        />
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontSize: 18,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
});

export default StripeApp;
