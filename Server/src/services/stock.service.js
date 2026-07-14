export const calculateRemainingStock = ({
  startDate,
  dosePerDay,
  totalQuantity,
}) => {

  if (!startDate || !dosePerDay || !totalQuantity) {
    throw new Error("Missing required fields for stock calculation");
  }

//   startDate = new Date();

  const today = new Date();
  const start = new Date(startDate);

  const timeDiff = today.getTime() - start.getTime();

  // REAL DAYS calculation
  const daysPassed = Math.floor(timeDiff / (1000 * 60 ));

  const safeDaysPassed = daysPassed < 0 ? 0 : daysPassed;

  const consumed = safeDaysPassed * dosePerDay;

  const remaining = totalQuantity - consumed;

  console.log(
    "today: ", today,
    "timeDiff: ", timeDiff,
    "daysPassed: ", daysPassed,
    "safeDaysPassed: ", safeDaysPassed,
    "consumed: ", consumed,
    "remaining: ", remaining
  );
  

  return {
    daysPassed: safeDaysPassed,
    consumed,
    remaining: remaining < 0 ? 0 : remaining,
  };
};
