const { isArray } = require("util");

exports.calcRate = (comments) => {
  const sumRates = comments.reduce((acc, item) => acc + item.rating, 0);
  console.log(sumRates, "sumRates");
  const length = comments.length === 0 ? 5 : comments.length * 5;
  console.log(length, "length");

  return Math.ceil((((sumRates * 100) / length) * 5) / 100);
};

exports.toursStats = (data) => {
  let minPrice = 0,
    maxPrice = 0,
    categories = {},
    cities = {},
    rates = {};
  data.map((tour) => {
    minPrice = 0;
    maxPrice = 0;

    if (tour.price_per_person > maxPrice) {
      maxPrice = tour.price_per_person;
    } else {
      minPrice = tour.price_per_person;
    }
    if (isArray(tour.category))
      tour.category?.map((cat) => {
        categories = {
          ...categories,
          [cat.name]: categories[cat.name] ? ++categories[cat.name] : 1,
        };
      });
    else {
      categories = {
        ...categories,
        [tour.category.name]: categories[tour.category.name]
          ? ++categories[tour.category.name]
          : 1,
      };
    }
    if (isArray(tour.city))
      tour.city?.map((cit) => {
        cities = {
          ...cities,
          [cit.title]: cities[cit.title] ? ++cities[cit.title] : 1,
        };
      });
    else {
      cities = {
        ...cities,
        [tour.city.title]: cities[tour.city.title]
          ? ++cities[tour.city.title]
          : 1,
      };
    }
    rates = {
      ...rates,
      [tour.rate]: rates[tour.rate] ? ++rates[tour.rate] : 1,
    };
  });
  return { minPrice, maxPrice, categories, cities, rates };
};
