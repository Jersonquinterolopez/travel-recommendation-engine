import { ReactNode } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface CardProps {
  header: ReactNode;
  children: ReactNode;
  imageUrl?: string;
  moreDetailUrl?: string;
  moreDetailLabel?: string;
}
export function Card({
  header,
  children,
  moreDetailUrl,
  moreDetailLabel,
}: CardProps) {
  return (
    <div className="m-4 rounded-md shadow-md">
      <div className="rounded-t-md bg-black px-4 py-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row truncate text-white">
            <div className="self-center font-bold">{header}</div>
          </div>
          {moreDetailUrl && moreDetailLabel && (
            <a
              className="ml-4 shrink-0 self-center rounded-full text-gray-800 bg-white p-2 px-3 text-sm no-underline"
              href={moreDetailUrl}
            >
              {moreDetailLabel}{" "}
              <ArrowTopRightOnSquareIcon className="inline h-5 w-5 align-text-top" />
            </a>
          )}
        </div>
      </div>
      <div className="rounded-b-md bg-white p-4 text-gray-800">{children}</div>
    </div>
  );
}
