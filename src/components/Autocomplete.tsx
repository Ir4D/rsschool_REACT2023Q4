/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, forwardRef } from 'react';
import './Autocomplete.css';
import axios from 'axios';

interface Country {
  name: string;
}

interface AutocompleteProps {
  onSelectCountry: (country: string) => void;
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ onSelectCountry }, ref) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
      window.addEventListener('mousedown', handleClickOutside);
      async function getCountries() {
        const response = await axios.get<Country[]>('./Countries.json');
        setCountries(response.data);
      }
      getCountries();
      return () => {
        window.removeEventListener('mousedown', handleClickOutside);
      };
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

    const handleClickOutside = (event: MouseEvent) => {
      if (ref && 'current' in ref && ref.current) {
        if (!ref.current.contains(event.target as Node)) {
          hideFilteredCountries();
        }
      }
    };

    const handleClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
      const selectedValue = e.currentTarget.textContent || '';
      setSelectedCountry(selectedValue);
      onSelectCountry(selectedValue);
      hideFilteredCountries();
    };

    return (
      <div className="autocomplete" ref={ref}>
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
                  onClick={handleClickItem}
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

export default Autocomplete;
