const { tourModel: Tour } = require("../../models");

exports.ToursStats = async (req, res, next) => {
  try {
    const { data } = req.Result;

    const toursStats = () => {
      let minPrice,
        maxPrice,
        categories = {},
        cities = {},
        rates = {};
      rateCounter = 1;
      data.map((tour) => {
        minPrice = data[0].price_per_person;
        maxPrice = data[0].price_per_person;

        if (tour.price_per_person > maxPrice) {
          maxPrice = tour.price_per_person;
        } else {
          minPrice = tour.price_per_person;
        }
        tour.category.map((cat) => {
          categories = {
            ...categories,
            [cat.name]: categories[cat.name] ? ++categories[cat.name] : 1,
          };
        });
        tour.city.map((cit) => {
          cities = {
            ...cities,
            [cit.title]: cities[cit.title] ? ++cities[cit.title] : 1,
          };
        });
        rates = {
          ...rates,
          [tour.rate + "Star"]: rates[tour.rate + "Star"]
            ? ++rates[tour.rate + "Star"]
            : 1,
        };
      });
      return { minPrice, maxPrice, categories, cities, rates };
    };

    req.Result = {
      ...req.Result,
      length: undefined,
      data: {
        ...toursStats(),
      },
    };
    next();
  } catch (err) {
    next(err);
  }
};
