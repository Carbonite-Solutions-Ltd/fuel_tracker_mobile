import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Layout, Modal, Card, Text, Input } from "@ui-kitten/components";
import Form from "../components/form.component";


export const FuelIssuedScreen = () => {
  const navigateDetails = () => {
    setVisible(true);
  };

  const [visible, setVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Input
        placeholder='Select Resource'
      />
      </Layout>
    </SafeAreaView>
  );
};