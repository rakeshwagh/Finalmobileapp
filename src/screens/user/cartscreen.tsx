import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import cartIcon from "../../assets/icons/cart_beg_active.png";
import { colors, network } from "../../constants";
import CartProductList from "../../components/CartProductList/CartProductList";
import CustomButton from "../../components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import { bindActionCreators } from "redux";




const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirecion: "row",
      backgroundColor: colors.light,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingBottom: 0,
      flex: 1,
    },
    topBarContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
    },
    toBarText: {
      fontSize: 15,
      fontWeight: "600",
    },
    cartProductListContiainer: { width: "100%", padding: 20 },
    cartProductListContiainerEmpty: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    secondaryTextSmItalic: {
      fontStyle: "italic",
      fontSize: 15,
      color: colors.muted,
    },
    cartBottomContainer: {
      width: "100%",
      height: 120,
      display: "flex",
      backgroundColor: colors.white,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      elevation: 3,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    cartBottomLeftContainer: {
      padding: 20,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: "center",
      width: "30%",
      height: "100%",
    },
    cartBottomRightContainer: {
      padding: 30,
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      alignItems: "center",
      width: "70%",
      height: "100%",
    },
    cartBottomPrimaryText: {
      fontSize: 15,
      fontWeight: "bold",
    },
    cartBottomSecondaryText: {
      fontSize: 12,
      fontWeight: "bold",
    },
    emptyView: {
      width: "100%",
      height: 20,
    },
    IconContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.light,
      height: 40,
      width: 40,
      borderRadius: 5,
    },
    cartInfoContainerTopBar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    cartInfoTopBar: {
      justifyContent: "center",
      alignItems: "flex-start",
      marginLeft: 5,
    },
  });
  