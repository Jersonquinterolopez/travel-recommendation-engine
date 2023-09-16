// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { cities } from "../../i83/cities.json";

type Data = {
  name: string;
};

function getCitiesArray(cities: string[]) {
  const citiesSet = new Set();

  // Add cities to the Set
  cities.forEach((city) => {
    citiesSet.add(city);
  });

  const citiesArray: Array<Record<string, string>> = [];

  // Convert Set to array with desired structure
  citiesSet.forEach((city: string) => {
    citiesArray.push({ value: city, label: city });
  });

  return citiesArray;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const citiesArray = getCitiesArray(cities);
  console.log(citiesArray);

  res.status(200).json({ name: "John Doe" });
}
