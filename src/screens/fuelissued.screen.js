import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { Layout, Input, Button } from '@ui-kitten/components';
import DatePickerComponent from '../data/DatePickerComponent';
import SiteSelector from '../data/SiteSelector';
import TankerSelector from '../data/TankerSelector';
import ResourceSelector from '../data/ResourceSelector';
import { useFrappe } from '../provider/backend';

export const FuelIssuedScreen = () => {
  const { db } = useFrappe();
  const [siteId, setSiteId] = useState('');
  const [tankerId, setTankerId] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [odometer, setOdometer] = useState('');
  const [fuelIssued, setFuelIssued] = useState('');
  const [date, setDate] = useState(new Date());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (db) {
      setIsReady(true);
    }
  }, [db]);

  const handleSiteSelect = (id) => setSiteId(id);
  const handleTankerSelect = (id) => setTankerId(id);
  const handleResourceSelect = (id) => setResourceId(id);

  const handleSubmit = async () => {
    if (!isReady) {
      console.error('Database is not initialized');
      Alert.alert('Error', 'Database is not initialized');
      return;
    }
    const formData = {
      site: siteId,
      fuel_tanker: tankerId,
      resource: resourceId,
      odometer_km: odometer,
      fuel_issued_lts: fuelIssued,
      date: "2024-03-20",
    };
  
    try {
      const doc = await db.createDoc('Fuel Used', formData);
      console.log('Document created successfully:', doc);
      Alert.alert('Success', 'Document created successfully');
    } catch (error) {
      console.error('Failed to create document:', error);
      Alert.alert('Error', `Failed to create document: ${error.message}`);
    }
  };
  



  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DatePickerComponent onDateChange={setDate} />
        <SiteSelector onSiteSelect={handleSiteSelect} />
        <TankerSelector onTankerSelect={handleTankerSelect} />
        <ResourceSelector onResourceSelect={handleResourceSelect} />
        <Input
          placeholder='Odometer (KM)'
          style={{ marginTop: 20 }}
          value={odometer}
          onChangeText={setOdometer}
        />
        <Input
          placeholder='Fuel Issued (LTS)'
          style={{ marginTop: 20 }}
          value={fuelIssued}
          onChangeText={setFuelIssued}
        />
        <Button onPress={handleSubmit}>Submit</Button>
      </Layout>
    </SafeAreaView>
  );
};
