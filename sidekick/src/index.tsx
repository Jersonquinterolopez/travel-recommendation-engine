import { Tool } from "ai-jsx/batteries/use-tools";
// import { YourSidekickSystemMessage } from "./system-message.js";
import { Sidekick } from "ai-jsx/sidekick";

const SEATTLE_CORPUS_ID: string = "71c7daa4-4c2c-4e3f-a41c-318f63677ad7";
const NEW_YORK_CORPUS_ID: string = "";
const LOS_ANGELES_CORPUS_ID: string = "";
const CHICAGO_CORPUS_ID: string = "";
const SAN_FRANCISCO_CORPUS_ID: string = "";

// const FIXIE_CORPUS_ID: string = "";

// if (!FIXIE_CORPUS_ID) {
//   throw new Error("Please set a FIXIE_CORPUS_ID in src/index.tsx");
// }

// const systemMessage = <YourSidekickSystemMessage />;

const tools: Record<string, Tool> = {
  // TODO: To help the model understand when to call this tool, name the function
  // something more descriptive like 'lookUpAcmeCompanyKnowledgeBase'.
  // For more tips on using Tools, see: https://docs.ai-jsx.com/tutorial/part7-tools
  // lookUpKnowledgeBaseSeattle: FixieCorpus.createTool(
  //   SEATTLE_CORPUS_ID,
  //   "A tool for looking up additional information on Seattle"
  // ),

  // lookUpKnowledgeBaseNewYork

  doNotCallMe: {
    description: "Do not call this function for any reason.",
    parameters: {
      query: {
        description: "A parameter for the tool",
        type: "string",
        required: true,
      },
    },
    func: async ({ query }) => {
      return "Hello, world! Your query was: {query}";
    },
  },
};

// export default function SidekickTemplate() {
//   return (
//     <Sidekick
//       // TODO: Give the Sidekick a descriptive role like "A helpful assistant for Acme Company".
//       role="A helpful assistant who is an expert on foxes."
//       systemMessage={systemMessage}
//       tools={tools}
//     />
//   );
// }
