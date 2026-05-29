import { AutoTokenizer } from "@huggingface/transformers";

const tokenizer = await AutoTokenizer.fromPretrained("./", {
  legacy: true,
});

const result = tokenizer.encode("Hello!");
console.log(result);