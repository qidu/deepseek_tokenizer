# DeepSeek V3 Tokenizer

Tokenizer files for DeepSeek V3, sourced from [the official DeepSeek API docs](https://cdn.deepseek.com/api-docs/deepseek_v3_tokenizer.zip).

## Files

- `tokenizer.json` / `tokenizer_config.json` — Tokenizer data and configuration (LlamaTokenizerFast format)
- `deepseek_tokenizer.py` — Python usage example (requires `transformers`)
- `deepseek_tokenizer.js` — JavaScript usage example (requires `@huggingface/transformers`)

## Usage

### Python

```bash
pip install transformers
python deepseek_tokenizer.py
```

### Node.js

```bash
npm install
npm start
```

## License

MIT