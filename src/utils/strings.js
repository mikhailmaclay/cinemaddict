export const cutText = (text, limit) => {
  if (text.length <= limit) {
    return text;
  }

  const words = text.split(` `);
  let cuttedText = ``;
  let i = 0;

  while ((cuttedText + words[i]).length - 3 <= limit && i < words.length) {
    cuttedText += `${words[i]} `;

    ++i;
  }

  return cuttedText + ` ...`;
};
