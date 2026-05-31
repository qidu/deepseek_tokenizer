import { AutoTokenizer } from "@huggingface/transformers";
import { Tokenizer } from "@huggingface/tokenizers";
import { Tiktoken } from "js-tiktoken/lite";
import cl100k_base from "js-tiktoken/ranks/cl100k_base";
import o200k_base from "js-tiktoken/ranks/o200k_base";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const testsDir = path.resolve("../model_proxy_v3/tests");
const tokenizerJSON = JSON.parse(await readFile("./tokenizer.json", "utf8"));
const tokenizerConfig = JSON.parse(await readFile("./tokenizer_config.json", "utf8"));

const tokenizers = [
  {
    name: "transformers AutoTokenizer",
    tokenizer: await AutoTokenizer.from_pretrained("./", { legacy: true }),
    encode: (tokenizer, text) => ({ ids: tokenizer.encode(text), tokens: tokenizer.tokenize(text) }),
  },
  {
    name: "tokenizers Tokenizer",
    tokenizer: new Tokenizer(tokenizerJSON, tokenizerConfig),
    encode: (tokenizer, text) => tokenizer.encode(text),
  },
  {
    name: "tiktoken cl100k_base",
    tokenizer: new Tiktoken(cl100k_base),
    encode: (tokenizer, text) => ({ ids: tokenizer.encode(text), tokens: tokenizer.encode(text).map(String) }),
  },
  {
    name: "tiktoken o200k_base",
    tokenizer: new Tiktoken(o200k_base),
    encode: (tokenizer, text) => ({ ids: tokenizer.encode(text), tokens: tokenizer.encode(text).map(String) }),
  },
];

const files = (await readdir(testsDir)).sort();

for (const [index, file] of files.entries()) {
  const filePath = path.join(testsDir, file);
  const content = await readFile(filePath, "utf8");

  console.log(`=== ${index + 1}. ${file} ===`);
  console.log(`chars: ${content.length}`);

  for (const { name, tokenizer, encode } of tokenizers) {
    const encoded = encode(tokenizer, content);
    const tokenCount = encoded.ids.length;

    console.log(`### ${name} ###`);
    console.log(`tokens: ${tokenCount}`);
    // console.log(encoded.ids);
    // console.log(encoded.tokens);
    console.log("");
  }

  console.log("");
}
