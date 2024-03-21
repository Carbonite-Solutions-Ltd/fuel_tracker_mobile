import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Autocomplete, AutocompleteItem, Button, Layout, Modal, Card, Text } from "@ui-kitten/components";
import Form from "../components/form.component";
import { useFrappe } from "../provider/backend";
import styled from "styled-components";

const OverviewScreenContainer = styled(Layout)`
padding-top: 2px;
padding-left: 20px;
padding-right: 20px;
`

export const HomeScreen = () => {
  const { db, call } = useFrappe();
  const [totalfuelused, setTotalFuelUsed] = React.useState(null);
  const [totalfuelsupplied, setTotalFuelSupplied] = React.useState(null);
  const [totalfuelbalance, setTotalFuelBalance] = React.useState([]);
  useEffect(() => {

    call.get('total-fuel-used').then((data) => {
      const totalFuelUsed = data.message;
      const formattedTotalFuelUsed = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(totalFuelUsed);
      setTotalFuelUsed(formattedTotalFuelUsed);
    }),

    call.get('total-fuel-balance').then((data) => {
      const totalFuelBalance = data.message;
      const formattedTotalFuelBalance = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(totalFuelBalance);
      setTotalFuelBalance(formattedTotalFuelBalance);
    }),

    call.get('total-fuel-supplied').then((data) => {
      const totalFuelSupplied = data.message;
      const formattedTotalFuelSupplied = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(totalFuelSupplied);
      setTotalFuelSupplied(formattedTotalFuelSupplied);
    })
    
  }, [db])



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverviewScreenContainer>
      <Layout style={{ marginVertical: 20 }}></Layout>
        <Text category="h5" >Fuel Tracker Overview</Text>

        <Layout style={{ marginVertical: 20 }}></Layout>
       <Card status="success">
          <Text>Total Fuel Issued</Text>
          <Text category="h1">{totalfuelused}</Text>
        </Card>
        
        <Layout style={{ marginVertical: 20 }}></Layout>

        <Card status="danger">
          <Text>Fuel Balance</Text>
          <Text category="h1">{totalfuelbalance}</Text>
        </Card> 

        <Layout style={{ marginVertical: 20 }}></Layout>

        <Card status="info">
          <Text>Total Fuel Supplied</Text>
          <Text category="h1">{totalfuelsupplied}</Text>
        </Card>        
      </OverviewScreenContainer>
    </SafeAreaView>
  );
};


