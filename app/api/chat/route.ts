import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { Message } from "ai";

const TEMPLATE = `Extract the requested fields from the input.

The field "entity" refers to the first mentioned entity in the input.

Current conversation: {chat_history}
Input: {input}
AI:`;

const format = (m: Message) => `${m.role}: ${m.content}`;

// structured output schema
const schema = z.object({
  tone: z
    .enum(["neutral", "positive", "negative"])
    .describe("The tone of the input"),
  entity: z.string().describe("The mentioned entity in the input"),
  word_count: z.number().describe("The word count of the input"),
  chat_response: z.string().describe("The response from the chat model"),
  final_puctuation: z
    .string()
    .optional()
    .describe("The optional final punctuation of the input"),
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1).map(format);
    const currentMessageContent = messages[messages.length - 1].content;

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: "gpt-3.5-turbo-1106",
    }).bind({
      functions: [
        {
          name: "output_formatter",
          description: "should format the output of the model",
          parameters: zodToJsonSchema(schema),
        },
      ],
      // ensure the model will always call the output_formatter function
      function_call: { name: "output_formatter" },
    });

    const parser = new JsonOutputFunctionsParser();

    const chain = prompt.pipe(model).pipe(parser);

    const result = await chain.invoke({
      input: currentMessageContent,
      chat_history: previousMessages.join("\n"),
    });

    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
