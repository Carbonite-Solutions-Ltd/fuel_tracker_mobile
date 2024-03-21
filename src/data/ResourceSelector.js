import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { useFrappe } from '../provider/backend'; // Ensure this path is correctly adjusted to your file structure

const ResourceSelector = ({ onResourceSelect }) => {
  const { call } = useFrappe();
  const [resourceValue, setResourceValue] = useState('');
  const [resources, setResources] = useState([]);

// Inside ResourceSelector.js

useEffect(() => {
    call.get('resource-list')
      .then(response => {
        const fetchedResources = response.message.map(resource => ({
          id: resource.name, // Assuming 'name' is your resource ID
          title: `${resource.name}`, // Adjusted
        }));
        setResources(fetchedResources);
      })
      .catch(error => console.error('Error fetching Resources:', error));
  }, [call]);
  

  const onSelect = (index) => {
    setResourceValue(resources[index].title);
    // Optionally, you might want to pass both ID and resource to the parent component
    onResourceSelect(resources[index].id);
  };

  const onChangeText = (query) => {
    setResourceValue(query);
  };

  return (
    <Autocomplete
      placeholder='Select a Resource'
      value={resourceValue}
      onSelect={onSelect}
      onChangeText={onChangeText}
    >
      {resources.map((resource, index) => (
        <AutocompleteItem key={index} title={resource.title} />
      ))}
    </Autocomplete>
  );
};

export default ResourceSelector;
