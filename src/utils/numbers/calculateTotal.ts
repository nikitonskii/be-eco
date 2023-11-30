export const calculateTotal = (start: Date, end: Date, pointsAmount: number, fullQuizTime: number) => {
  const timeDifference = Math.abs(new Date(end).getTime() - new Date(start).getTime());
  const seconds = (timeDifference % 60000) / 1000;

  return Math.round(pointsAmount * 10 + (fullQuizTime - seconds));
};
