const translate = require("google-translate-api");

exports.translateText = async (text, targetLang) => {
  try {
    const response = await translate(text, { to: targetLang });
    return response.text;
  } catch (error) {
    return text;
  }
};
