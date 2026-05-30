import { AutoTokenizer } from "@huggingface/transformers";

const tokenizer = await AutoTokenizer.from_pretrained("./", {
  legacy: true,
});

const result = tokenizer.encode("Hello!");
console.log(result);
