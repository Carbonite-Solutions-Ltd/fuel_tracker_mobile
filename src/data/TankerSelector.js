import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { useFrappe } from '../provider/backend'; // Adjust the import path as necessary

const TankerSelector = ({ onTankerSelect }) => {
  const { call } = useFrappe();
  const [tankerValue, setTankerValue] = useState('');
  const [tankers, setTankers] = useState([]);

  useEffect(() => {
    call.get('tanker-list')
      .then(response => {
        const fetchedTankers = response.message.map(tanker => ({
          id: tanker.name,
          title: tanker.tanker, // Adjust if your tanker objects use a different property for the title
        }));
        setTankers(fetchedTankers);
      })
      .catch(error => console.error('Error fetching Tankers:', error));
  }, [call]);

  const onSelect = (index) => {
    setTankerValue(tankers[index].title);
    onTankerSelect(tankers[index].id);
  };

  const onChangeText = (query) => {
    setTankerValue(query);
  };

  return (
    <Autocomplete
      placeholder='Select a Tanker'
      value={tankerValue}
      onSelect={onSelect}
      onChangeText={onChangeText}
    >
      {tankers.map((tanker, index) => (
        <AutocompleteItem key={index} title={tanker.title} />
      ))}
    </Autocomplete>
  );
};

export default TankerSelector;
