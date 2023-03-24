import { View, Text, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import axios from "axios";
import { network } from "../constants";
import RazorpayCheckout from "react-native-razorpay";

export default function Payment() {
  const [ orderId, setOrderId ] = useState(null)
  const [ amount, setAmount ] = useState(0)
  const handlePayment = async () => {
    console.log("Payment Initiated");
    const body = {
      amount: 1000,
    };
    axios
      .post(`${network.serverip}/payments/createOrder`, body)
      .then((res) => {
        let data = res.data;
        let { id, amount } = data.order;
        setAmount(amount);
        setOrderId(id);
      })
      .catch((err) => console.log(err.message));
      var options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.jpg",
        currency: "INR",
        key: "rzp_test_IjG6Bn2dDLvkSz",
        amount: amount,
        name: "Acme Corp",
        order_id: orderId, //Replace this with an order_id created using Orders API.
        prefill: {
          email: "gaurav.kumar@example.com",
          contact: "9191919191",
          name: "Gaurav Kumar",
        },
        theme: { color: "#53a20e" },
      };
      await RazorpayCheckout.open(options)
          .then((data) => {
            // handle success
            console.log(`Success: ${data.razorpay_payment_id}`);
          })
          .catch((error) => {
            // handle failure
            console.log(`Error: ${error.code} | ${error.message}`);
          });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => handlePayment()}>
        <Text>Payment</Text>
      </TouchableOpacity>
    </View>
  );
}
