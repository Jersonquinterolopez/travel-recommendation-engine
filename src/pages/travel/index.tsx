import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Card, Flex, Input, Select } from "@mantine/core";
import { MapStyles } from "@/utils/mapStyles";
import Loader from "@/components/Loader";
import { MDXMessage } from "@/components/MDXMessage";
import useController from "../../hooks/useController";
import styled from "styled-components";

export const DialogBox = styled.div`
    width: 45vw;
    height: auto;
    background-color: #a4a4a4ba;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    @media (max-width: 768px) {
        width: 80vw;
    }
`;

export const DividerVerticalLine = styled.div`
    width: 245px;
    height: 3px;
    background-color: #00e1ff;
`;

const Travel = () => {
    const {
        mapCenter,
        handleSubmit,
        userPreferences,
        setUserPreferences,
        city,
        setCity,
        isLoading,
        result,
    } = useController();

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""}
        >
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100vh" }}
                center={mapCenter}
                zoom={12}
                options={{
                    disableDefaultUI: true,
                    styles: MapStyles,
                }}
            />
            <DialogBox>
                <form onSubmit={handleSubmit}>
                    <Input
                        size="lg"
                        m={"10px"}
                        icon={<div>✨</div>}
                        className="pb-4"
                        placeholder="Where to?"
                        value={userPreferences}
                        onChange={(event) => {
                            setUserPreferences(event.currentTarget.value);
                        }}
                    />
                    <div className="relative">
                        <details className="absolute top-0 mt-[-1.5rem] z-50">
                            <summary className="  text-slate-100 text-xs py-2 px-4 rounded ">
                                What is this?
                            </summary>
                            <p className="text-slate-700 ml-3 bg-slate-100 rounded-md p-2 text-xs shadow-md w-1/2 ">
                            Here are some preset questions of what you can do in a city. You can also type your own question in the input box above.
                            </p>
                        </details>
                    </div>
                    <Flex m={"10px"}>
                        <button
                            type="button"
                            onClick={() =>
                                setUserPreferences("Where Can I Eat in:")
                            }
                            className="bg-gray-600 m-1 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            🍔 Where Can I Eat:{" "}
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setUserPreferences("Where Can I play golf in:")
                            }
                            className="bg-gray-600 m-1 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            ⛳️ Where Can I play golf:{" "}
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setUserPreferences("Where Can I dance in:")
                            }
                            className="bg-gray-600 m-1 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            🕺🏻 Where Can I dance:{" "}
                        </button>
                    </Flex>

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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px",
                        }}
                    >
                        <button
                            type="submit"
                            className="bg-gray-600 m-1 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isLoading ? <Loader size={"xs"} /> : "Button"}
                            </div>
                        </button>
                    </div>
                </form>
                {result && (
                    <Card m="10px">
                        <MDXMessage text={result} isLoading={isLoading} />
                    </Card>
                )}
            </DialogBox>
        </LoadScript>
    );
};

export default Travel;
