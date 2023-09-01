const axios = require("axios");
const client = axios.create({
  headers: {
    Authorization:
      "Bearer " + "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",
  },
});
const text = "this is a job description";
const url = "https://api.openai.com/v1/embeddings";
const params = { input: text, model: "text-embedding-ada-002" };

(async () => {
  const response = await client.post(url, params);
  const embed = response.data.data[0].embedding;
  console.log(embed);
})();

// Using a loop to represent the complete array
