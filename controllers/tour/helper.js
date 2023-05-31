exports.calcRate = (comments) => {
  const sumRates = comments.reduce((acc, item) => acc + item.rating, 0);
  console.log(sumRates, "sumRates");
  const length = comments.length === 0 ? 5 : comments.length * 5;
  console.log(length, "length");

  return Math.ceil((((sumRates * 100) / length) * 5) / 100);
};
