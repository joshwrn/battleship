const checkPrediction = (num) => {
  if (num < 0 || num > 99) {
    return true;
  } else {
    return false;
  }
};

export default checkPrediction;
