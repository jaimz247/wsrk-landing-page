import { useState, useEffect } from 'react';
import { PRICING_CONFIG, CountryCode, PricingTier, getPricingForCountry } from '../config/pricing';

export const useGeolocationPricing = () => {
  const [pricing, setPricing] = useState<PricingTier>(PRICING_CONFIG.INTL);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const storedCountry = localStorage.getItem('selected_country');
        if (storedCountry && PRICING_CONFIG[storedCountry as CountryCode]) {
          setPricing(PRICING_CONFIG[storedCountry as CountryCode]);
          setIsLoading(false);
          return;
        }

        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country;
          const newPricing = getPricingForCountry(countryCode);
          setPricing(newPricing);
          localStorage.setItem('selected_country', newPricing.code);
        } else {
          setPricing(PRICING_CONFIG.INTL);
        }
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setPricing(PRICING_CONFIG.INTL);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const changeCountry = (countryCode: CountryCode) => {
    const newPricing = getPricingForCountry(countryCode);
    setPricing(newPricing);
    localStorage.setItem('selected_country', newPricing.code);
  };

  return { 
    pricing, 
    isLoading, 
    changeCountry, 
    allPricing: Object.values(PRICING_CONFIG) 
  };
};
