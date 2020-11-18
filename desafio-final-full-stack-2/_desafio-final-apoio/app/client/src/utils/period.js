const createPeriodList = () => {
  const monthShorName = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const periodsList = [];

  let index = 0;
  for (let year = 2021; year >= 2019; year--) {
    for (let month = 12; month >= 1; month--) {
      periodsList.push({
        id: year.toString() + '-' + month.toString().padStart(2, '0'),
        value: monthShorName[month - 1] + '/' + year.toString(),
        index: index++,
      });
    }
  }

  return periodsList;
};

/*
const getCurrentPeriod = () => {
  const date = new Date();
  return (
    date.getFullYear().toString() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0')
  );
};
*/

export default { createPeriodList };
