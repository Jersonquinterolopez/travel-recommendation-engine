import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import { Button, Card, Input, Select } from "@mantine/core";
import { error } from "console";
import { MDXMessage } from "./MDXMessage";
import Loader from "./Loader";

const exampleMapStyles = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#838383",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c4c4c4",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#aaaaaa",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#151516",
      },
      {
        lightness: "0",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 21,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        hue: "#ff0000",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        saturation: "-100",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#6fada8",
      },
      {
        lightness: "0",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#85a5b6",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#575757",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c3c3c3",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#7ca6a6",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#5f5f5f",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#6eacb8",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
];

const DialogBox = styled.div`
  width: 45vw;
  height: auto;
  background-color: #a4a4a4ba;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const DialogInputContainer = styled.div``;

const Logotype = styled.img`
  width: 32px;
`;

function systemMessageFormater(userPreferences: string, city: string) {
  return `=== PROMPT ${userPreferences} === ${city}`.trim();
}

const DividerVerticalLine = styled.div`
  width: 245px;
  height: 3px;
  background-color: #00e1ff;
`;

interface Coordinates {
  lat: number;
  lng: number;
}

// write a typeguard for a string type
function isString(value: any): value is string {
  return typeof value === "string";
}

const sendMessage = async ({
  message,
  setResult,
  setLoading,
}: {
  message: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const url =
    "https://api.fixie.ai/api/v1/agents/wross2/fixie-sidekick-template/conversations";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXhpZS5haS9wcm9kIiwiYXVkIjoiaHR0cHM6Ly9maXhpZS5haSIsInN1YiI6IjY3In0.YB9geocdLubJEqQdnZHEOkBcHzyf7ZdlVF5Q9lemy0M";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  };

  try {
    const response = await fetch(url, options);
    const reader = response!.body!.getReader();
    let result = "";
    let done = false;

    while (!done) {
      setLoading(true);
      const { value, done: isDone } = await reader.read();
      done = isDone;
      result += new TextDecoder().decode(value);
      const messages = result.split("\n").at(-2);
      if (messages) {
        const content = JSON.parse(messages)
          .turns?.at(-1)
          .messages?.at(-1)?.content;
        setResult(content ?? "");
      }
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setResult("");
  } finally {
    setLoading(false);
  }
};

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [userPreferences, setUserPreferences] = useState<string>("");
  const [city, setCity] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to get the user's location using Geolocation API
  const getUserLocation = ({ lat, lng }: Coordinates) => {
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
  };

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
  }, []);

  useEffect(() => {
    if (isString(city)) {
      getCityCoordinates(city).then((cityCordinates) => {
        getUserLocation({ lat: cityCordinates.lat, lng: cityCordinates.lng });
      });
    }
  }, [city, getUserLocation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage({
      message: systemMessageFormater(userPreferences, city ?? ""),
      setResult: setResult,
      setLoading: setIsLoading,
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        center={mapCenter}
        zoom={12}
        // pass props to remove google maps buttons from the map
        options={{
          disableDefaultUI: true,
          styles: exampleMapStyles,
        }}
      >
        {/* You can add markers, polygons, or other components here */}
      </GoogleMap>
      <DialogBox>
        <form onSubmit={handleSubmit}>
          <Input
            size="lg"
            m={"10px"}
            icon={<Logotype src="/travel.png" />}
            placeholder="Where to?"
            value={userPreferences}
            onChange={(event) => {
              setUserPreferences(event.currentTarget.value);
            }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DividerVerticalLine />
          </div>
          <Select
            size="lg"
            m={"10px"}
            placeholder="City"
            data={[
              { label: "San Francisco", value: "San Francisco" },
              { label: "New York", value: "New York" },
              { label: "Los Angeles", value: "Los Angeles" },
              { label: "Chicago", value: "Chicago" },
              { label: "Seattle", value: "Seattle" },
            ]}
            value={city}
            onChange={(value: string) => {
              setCity(value);
            }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DividerVerticalLine />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              radius="md"
              variant="filled"
              size="lg"
              m={"10px"}
              w="600px"
              color="cyan"
            >
              Go!
            </Button>
          </div>
        </form>
        <Card m="10px">
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoading && <Loader />}
          </div> */}
          <MDXMessage text={result} isLoading={isLoading} />
        </Card>
      </DialogBox>
    </LoadScript>
  );
};

export default MapComponent;
