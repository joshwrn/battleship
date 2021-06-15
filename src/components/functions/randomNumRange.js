//+ random from range
const randomNumRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default randomNumRange;
