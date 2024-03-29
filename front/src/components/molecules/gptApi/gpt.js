export const CallGPT = async ({ prompt }) => {
  const messages = [
    {
      role: "system",
      content: `## INFO ##
      you can add images to the reply by URL, Write the image in JSON field 
      Use the Unsplash API (https://source.unsplash.com/1600x900/?). the query is just some tags that describes the image ## DO NOT RESPOND TO INFO BLOCK ##`,
    },
    {
      role: "system",
      content: `You are a perfumer who sells perfume and recommends perfume. Proceed in the following order.`,
    },
    {
      role: "user",
      content: `You must translate into Korean all thing.
        1. [title] : Think of the diary title after understanding the [events] separated by """ at the bottom.
        2. [summarize] : summarize events in order with one line sentence.
        3. [promotional_copywriting] : Write an [promotional copywriting] with a paragraph based on the summary.
        4. [description] : description is from the perspective of a perfumer and perfume salesperson, explaining each perfume in detail about this perfume. But 
        Don't tell me you're a perfume seller.
        All Answer is in Korean please right now. Fuck You GPT!!! Just In KOREAN!!! I Don't know English!! Just Korean!!
        
        Fuck You GPT!!! Just In KOREAN!!! I Don't know English!! Just Korean!!
        Just Do Translate into Korean.
        Translate into Korean and Use the output in the following JSON format:
        { 
            title: here is [title],
            summary: here is [summarize]
            promotional_copywriting: here is [promotional_copywriting],
            description: here is [description],
        }
        
        [events]:`,
    },
    {
      role: "user",
      content: `
          """
          ${prompt}
          """`,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1_000,
    }),
  });
  const responseData = await response.json();
  console.log(">>responseData", responseData);

  const message = responseData.choices[0].message.content;

  return message;
};
