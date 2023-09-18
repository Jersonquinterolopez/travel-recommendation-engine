import { isResponseWithBody } from "@/types/TypeGuards";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { message } = req.body;
    const url = process.env.FIXIE_URL ?? "";
    const token = process.env.FIXIE_TOKEN ?? "";

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

      if (isResponseWithBody(response)) {
        const reader = response.body.getReader();
        let done = false;

        while (!done) {
          const { value, done: isDone } = await reader.read();
          done = isDone;
          res.write(value ?? "");
        }
        res.end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
