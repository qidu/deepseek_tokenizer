import { AutoTokenizer } from "@huggingface/transformers";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const tokenizer = await AutoTokenizer.from_pretrained("./", {
  legacy: true,
});

const testsDir = path.resolve("../model_proxy_v3/tests");
const files = (await readdir(testsDir)).sort();

let totalContentLength = 0;
let totalTokens = 0;

for (const [index, file] of files.entries()) {
  const filePath = path.join(testsDir, file);
  const content = await readFile(filePath, "utf8");
  const tokens = tokenizer.encode(content);

  totalContentLength += content.length;
  totalTokens += tokens.length;

  console.log(`=== ${index + 1}. ${file} ===`);
  console.log(`chars: ${content.length}`);
  console.log(`tokens: ${tokens.length}`);
  console.log(tokens);
  console.log("");
}

console.log(`total files:  ${files.length}`);
console.log(`total chars:  ${totalContentLength}`);
console.log(`total tokens: ${totalTokens}`);
