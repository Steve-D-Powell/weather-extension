import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider, Button, TextField, Layout, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { setStoredCities, getStoredCities } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCitites] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");

  useEffect(() => {
    getStoredCities().then((cities) => {
      console.log("Get", cities);
      setCitites(cities);
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
              connectedRight={<Button onClick={addCityHandler}>Add</Button>}
            />
          </Layout.Section>
          <Layout.Section>
            {cities.map((city, index) => (
              <WeatherCard
                city={city}
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
