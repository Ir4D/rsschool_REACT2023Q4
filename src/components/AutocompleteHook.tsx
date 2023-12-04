import React, { useState, useEffect } from 'react';
import './Autocomplete.css';
import axios from 'axios';

interface AutocompleteProps {
  onSelectCountry: (country: string) => void;
}

interface Country {
  name: string;
}

interface AutocompleteProps {
  onSelectCountry: (country: string) => void;
}

const AutocompleteR: React.FC<AutocompleteProps> = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    async function getCountries() {
      const response = await axios.get<Country[]>('./Countries.json');
      setCountries(response.data);
    }
    getCountries();
  }, []);

  const searchCountries = (value: string) => {
    if (!value) {
      setFilteredCountries([]);
      setDropdownVisible(true);
    } else {
      const filtered = countries.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
      setDropdownVisible(true);
    }
    setSelectedCountry(value);
  };

  const hideFilteredCountries = () => {
    setDropdownVisible(false);
  };

  const handleClickItem = (selectedValue: string) => {
    setSelectedCountry(selectedValue);
    onSelectCountry(selectedValue);
    hideFilteredCountries();
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Enter your country"
        value={selectedCountry}
        onChange={(e) => searchCountries(e.target.value)}
      />
      <div className={dropdownVisible ? 'visible' : 'invisible'}>
        {filteredCountries.length > 0 && (
          <ul className="autocomplete-dropdown">
            {filteredCountries.map((item, index) => (
              <li
                className="autocomplete-dropdown_item"
                key={index}
                onClick={() => handleClickItem(item.name)}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutocompleteR;
