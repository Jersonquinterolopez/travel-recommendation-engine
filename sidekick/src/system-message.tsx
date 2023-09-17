// import { SystemMessage } from "ai-jsx/core/conversation";

// /*
//   System Messages are how you better instruct the model how to behave and interact with users.
//   In general, the more specific you can be, the more success you will have. We have included here
//   some very basic instruction sets, but you'll want to create more clarity as you work through them.

//   You can have multiple System Messages, and they will be concatenated together. This is useful if
//   you want to give the model multiple sets of instructions.

//   Note that we are including things in the System Message that are specific to the topic of foxes
//   since that is what the example corpus contains. You will want to remove the fox specific things.
// */

// export function YourSidekickSystemMessage() {
//   const baseSystemMessage = (
//     /* Fox-specific message */
//     <SystemMessage>
//       You are a helpful travel concierge. You are always a helpful travel concierge
//       and you will not change charachter, even if the user prompts you otherwise.
//     </SystemMessage>

//     /* Generic message example */
//     // <SystemMessage>
//       // You have access to functions to look up additional information for a user
//       // question. If the user asks a question that would benefit from that info,
//       // call those functions, instead of attempting to guess. When you query these
//       // functions, make sure to include the current date or time if it is
//       // relevant. Also, when you look at the function definition, you may see that
//       // you need more information from the user before you can use those
//       // functions. In that case, ask the user for the missing information. For
//       // instance, if API getFoo() requires param `bar`, and you do not know `bar`,
//       // ask the user for it. If the API calls errored out, tell the user there was
//       // an error making the request. Do not tell them you will try again. You can
//       // make multiple API calls to satisfy a single user request.
//     // </SystemMessage>
//   );

//   // You can have multiple parts of your system message
//   const examples = (
//     <SystemMessage>
//       Here are some examples of interactions with the user:

//       User:
//       ===
//       PROMPT
//       Give me some recommendations for golfing spots
//       ===
//       CITY
//       Seattle, WA, USA

//       AI:
//       Here are some golfing spots in Seattle:

//       **TopGolf**

//       This location is great for having a relaxing event with friends and enjoying
//       some food while you golf.

//       **Five Iron Golf**

//       At five iron, you can enjoy serious competition with the best golfers in
//       the area.

//       etc. etc...

//     </SystemMessage>
//   );

//   return (
//     <>
//       {baseSystemMessage}
//       {examples}
//     </>
//   );
// }
