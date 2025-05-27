export const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(number);
  };

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

