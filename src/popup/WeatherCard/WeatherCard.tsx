import React, { useEffect, useState } from "react";
import { Card, Layout, Heading } from "@shopify/polaris";
import { fetchOpenWeatherData, OpenWeatherData } from "../../utils/api";
import "./WeatherCard.css";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>{children}</Card>
      </Layout.Section>
    </Layout>
  );
};

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => {
        console.log(err);
        setCardState("error");
      });
  }, [city]);

  if (cardState === "loading" || cardState === "error") {
    return (
      <WeatherCardContainer>
        {cardState === "loading" ? "Loading..." : "Error retrieving data!"}
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer>
      <Heading>{city}</Heading>
      <p>{Math.round(weatherData.main.temp)}</p>
      <p>Feels Like: {Math.round(weatherData.main.feels_like)}</p>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
