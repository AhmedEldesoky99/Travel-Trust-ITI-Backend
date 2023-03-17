const imageMapping = (array) => array?.map((item) => item.path);
const stringToArray = (string) => string?.replace(/\[|\]/g, "").split(",");

module.exports = { imageMapping, stringToArray };
