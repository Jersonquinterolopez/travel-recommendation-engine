import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { run, compile } from "@mdx-js/mdx";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { Card } from "./Card";
import Loader from "./Loader";

export function MDXMessage({
  text,
  isLoading,
}: {
  text: string;
  isLoading?: boolean;
}) {
  const [mdx, setMdx] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!text) {
        return;
      }
      let compiled;
      try {
        compiled = String(
          await compile(text, {
            outputFormat: "function-body",
            // If we enable this, we get slightly nicer error messages.
            // But we also get _jsxDev is not a function.
            // This seems surmountable but also not something I want to attend to now.
            development: false,
            remarkPlugins: [remarkGfm, remarkMath],
          })
        );
      } catch (e) {
        /**
         * This isn't expected to happen, but it's good to be defensive.
         */
        console.error("Invalid MDX", { e, text });
        return;
      }

      const { default: Content } = await run(compiled, runtime);

      const components = {
        p({ children }: any) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        a(props: any) {
          return <a {...props} target="_parent" />;
        },
        //   code: Code,
        //   ...GenUI
        Card: Card,
      };

      setMdx(<Content components={components} />);
    })();
  }, [text, isLoading]);

  if (!text) {
    return null;
  }

  return (
    <>
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Loader />{" "}
        </div>
      )}
      {mdx}
    </>
  );
}
