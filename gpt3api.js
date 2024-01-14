document.addEventListener('DOMContentLoaded', () => {

  async function callchatgpt() {
    const humidity = document.getElementById('humidityvalue').innerHTML;
    const conditions = document.getElementById('Conditions').innerHTML;
    const weathertemperature = document.getElementById('bigweathertemp').innerHTML;
    const location = document.getElementById('locationdata').innerHTML;
    const windspeed = document.getElementById('windspeedvalue').innerHTML;
    console.log(humidity + conditions + weathertemperature + location);

    try {
      const apiKey = await fetchApiKey();
      const openaiSecretKey = apiKey;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiSecretKey}`,
      };
      

      const data = {
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": `Give me a forecast that's as cheeky and entertaining as Carrot Weather. Bonus points for throwing in some witty comments about the unpredictable nature of weather, and maybe a snarky remark about the user's choice of location. Make meteorology sound as fun as a stand-up comedy routine! Write me a very short (80 words maximum) weather report for the current weather in Auckland which is: ${weathertemperature}, ${conditions}, ${humidity} humidity, windspeed of ${windspeed}. And make sure it includes specific references towards ${location}.` }],
        temperature: 0.5,
        max_tokens: 250,
        n: 1,
        stream: false,
      };

      const url = "https://api.openai.com/v1/chat/completions";

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json.choices[0].message.content);
        const messagecontent = json.choices[0].message.content;
        document.getElementById('apidata').innerHTML = messagecontent;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function init() {
    const button = document.getElementById("weatherForm");
    button.addEventListener("submit", (event) => {
      event.preventDefault();
      setTimeout(callchatgpt, 1500);
    });
  }

  init();

});
