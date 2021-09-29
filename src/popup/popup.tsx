import React from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

const App: React.FC<{}> = () => {
  return (
    <>
      <WeatherCard city="Vancouver" />
      <WeatherCard city="Port Moody" />
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
