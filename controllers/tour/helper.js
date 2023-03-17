exports.calcRate = (comments) => {
  sumRates = comments.reduce((acc, item) => acc + item.rating, 0);
  return Math.round(sumRates / comments.length);
};
