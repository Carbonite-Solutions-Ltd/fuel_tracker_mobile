import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { useFrappe } from '../provider/backend'; // Adjust the import path as necessary

const SiteSelector = ({ onSiteSelect }) => {
  const { call } = useFrappe();
  const [siteValue, setSiteValue] = useState('');
  const [sites, setSites] = useState([]);

  useEffect(() => {
    call.get('site-list')
      .then(response => {
        const fetchedSites = response.message.map(site => ({
          id: site.name,
          title: site.site_name,
        }));
        setSites(fetchedSites);
      })
      .catch(error => console.error('Error fetching Sites:', error));
  }, [call]);

  const onSelect = (index) => {
    setSiteValue(sites[index].title);
    onSiteSelect(sites[index].id); // Pass the selected site's id back to the parent component if needed
  };

  const onChangeText = (query) => {
    setSiteValue(query);
  };

  return (
    <Autocomplete
      placeholder='Select a Site'
      value={siteValue}
      onSelect={onSelect}
      onChangeText={onChangeText}
    >
      {sites.map((site, index) => (
        <AutocompleteItem key={index} title={site.title} />
      ))}
    </Autocomplete>
  );
};

export default SiteSelector;
