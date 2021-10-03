import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  AppProvider,
  Card,
  Layout,
  FormLayout,
  TextField,
  Heading,
  Button,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import "./options.css";
import {
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [defaultCityInput, setDefaultCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [savingState, setSavingState] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setDefaultCityInput(options.homeCity);
    });
  }, []);

  const handleDefaultCityChange = (newValue: string) => {
    setDefaultCityInput(newValue);
  };

  const handleSaveClick = () => {
    setSavingState(true);

    setStoredOptions({
      ...options,
      homeCity: defaultCityInput,
    }).then(() => {
      setTimeout(() => {
        setSavingState(false);
      }, 1000);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <div className="options-container">
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Default City"
          description="Choose a default city to pin to the top of the list."
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                label="City"
                value={defaultCityInput}
                onChange={handleDefaultCityChange}
                autoComplete="off"
                disabled={savingState}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        <div className="section save-button">
          {savingState ? (
            <Button loading onClick={() => {}} />
          ) : (
            <Button primary onClick={handleSaveClick}>
              Save
            </Button>
          )}
        </div>
      </Layout>
    </div>
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
