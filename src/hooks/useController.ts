import { Turn } from "@/types/Fixie";
import { Coordinates } from "@/types/GeoLocation";
import { isResponseWithBody, isString } from "@/types/TypeGuards";
import { useCallback, useEffect, useState } from "react";

function systemMessageFormater(userPreferences: string, city: string) {
  return `=== PROMPT ${userPreferences} === ${city}`.trim();
}

async function sendPrompt({
  message,
  setResult,
  setLoading,
}: {
  message: string;
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const url = "/api/send/message";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ message }),
  };

  try {
    const response = await fetch(url, options);
    if (isResponseWithBody(response)) {
      const reader = response.body.getReader();
      let result = "";
      let done = false;

      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;
        result += new TextDecoder().decode(value);
        const messages = result.split("\n").at(-2);
        if (messages) {
          const content = JSON.parse(messages);
          const turn: Turn = content.turns?.at(-1);
          const lastMessage: String | undefined = turn.messages.at(-1)?.content;
          isString(lastMessage) ? setResult(lastMessage) : setResult("");
        }
      }
    }
  } catch (error) {
    console.log(error);
    setResult("");
  } finally {
    setLoading(false);
  }
}

export default function useController() {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [userPreferences, setUserPreferences] = useState<string>("");
  const [city, setCity] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserLocation = useCallback(
    ({ lat, lng }: Coordinates) => {
      if (city) {
        navigator.geolocation.getCurrentPosition((position) => {
          setMapCenter({
            lat,
            lng,
          });
        });
      }
      if (navigator.geolocation && !city) {
        navigator.geolocation.getCurrentPosition((position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    [city]
  );

  const getCityCoordinates = async (city: string): Promise<Coordinates> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );
      const data = await response.json();
      let coordinates = data.results[0].geometry.location;
      return { lat: coordinates.lat, lng: coordinates.lng };
    } catch (error) {
      console.log(error);
      return { lat: 0, lng: 0 };
    }
  };

  useEffect(() => {
    getUserLocation({ lat: 0, lng: 0 });
  }, [getUserLocation]);

  useEffect(() => {
    if (isString(city)) {
      getCityCoordinates(city).then((cityCordinates) => {
        getUserLocation({ lat: cityCordinates.lat, lng: cityCordinates.lng });
      });
    }
  }, [city, getUserLocation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await sendPrompt({
      message: systemMessageFormater(userPreferences, city ?? ""),
      setResult: setResult,
      setLoading: setIsLoading,
    });
  };

  return {
    mapCenter,
    setMapCenter,
    userPreferences,
    setUserPreferences,
    city,
    setCity,
    result,
    handleSubmit,
    isLoading,
  };
}
