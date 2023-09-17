type ResponseWithBody = Response & { body: ReadableStream<Uint8Array> };

export function isResponseWithBody(
  response: Response
): response is ResponseWithBody {
  return response.body !== null;
}

export function isString(value: any): value is string {
  return typeof value === "string";
}
