const validateQuantity = async (array) => {
  const verifyQuantities = array.filter((element) => element.quantity < 1);
  if (verifyQuantities.length > 0) {
   return false;
  }
  return true;
};

module.exports = validateQuantity;