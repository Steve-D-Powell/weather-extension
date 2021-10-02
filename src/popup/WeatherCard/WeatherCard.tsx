import React, { useEffect, useState } from "react";
import { Card, Heading, Button } from "@shopify/polaris";
import { fetchOpenWeatherData, OpenWeatherData } from "../../utils/api";
import "./WeatherCard.css";
import { LocalStorageOptions } from "../../utils/storage";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <Card sectioned>{children}</Card>;
};

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCard: React.FC<{
  city: string;
  onDelete?: () => void;
  options: LocalStorageOptions;
}> = ({ city, onDelete, options }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, options.tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => {
        console.log(err);
        setCardState("error");
      });
  }, [city, options]);

  if (cardState === "loading" || cardState === "error") {
    return (
      <WeatherCardContainer>
        {cardState === "loading" ? "Loading..." : "Error retrieving data!"}
        <div>
          <Button plain destructive onClick={onDelete}>
            Remove
          </Button>
        </div>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer>
      <Heading>{city}</Heading>
      <p>{Math.round(weatherData.main.temp)}</p>
      <p>Feels Like: {Math.round(weatherData.main.feels_like)}</p>
      {onDelete && (
        <Button plain destructive onClick={onDelete}>
          Remove
        </Button>
      )}
    </WeatherCardContainer>
  );
};

export default WeatherCard;
