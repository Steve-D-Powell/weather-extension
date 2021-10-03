import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider, Button, TextField, Layout, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCitites] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => {
      setCitites(cities);
    });
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const addCityHandler = () => {
    if (cityInput === "") {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCitites(updatedCities);
      setCityInput("");
    });
  };

  const handleCityChange = (newValue: string) => setCityInput(newValue);

  const onDeleteHandler = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCitites(updatedCities);
    });
  };

  const handleDegreeChange = () => {
    const newOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(newOptions).then(() => {
      setOptions(newOptions);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <>
      <Page>
        <Layout>
          <Layout.Section>
            <TextField
              label=""
              placeholder="City name"
              type="text"
              value={cityInput}
              autoComplete="off"
              onChange={handleCityChange}
              connectedRight={
                <>
                  <Button onClick={addCityHandler}>Add</Button>
                  <Button onClick={handleDegreeChange}>
                    {options.tempScale === "metric" ? "\u2103" : "\u2109"}
                  </Button>
                </>
              }
            />
          </Layout.Section>
          <Layout.Section>
            {options.homeCity != "" && (
              <WeatherCard city={options.homeCity} options={options} />
            )}
            {cities.map((city, index) => (
              <WeatherCard
                city={city}
                options={options}
                key={index}
                onDelete={() => onDeleteHandler(index)}
              />
            ))}
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(
  <AppProvider i18n={enTranslations}>
    <App />
  </AppProvider>,
  root
);
