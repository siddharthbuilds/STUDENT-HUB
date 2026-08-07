export function getMonths(dateStr1, dateStr2)
{
    let d1 = new Date(dateStr1);
  let d2 = new Date(dateStr2);
  
  if (d1 > d2) [d1, d2] = [d2, d1];

  const results = [];
  

  let currentYear = d1.getFullYear();
  let currentMonth = d1.getMonth(); 
  
  const endYear = d2.getFullYear();
  const endMonth = d2.getMonth();

  while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
    const tempDate = new Date(currentYear, currentMonth, 1);
    const monthName = tempDate.toLocaleString('en-US', { month: 'long' });
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    results.push({
      year: currentYear,
      month: monthName,
      monthNum: currentMonth+1,
      last: lastDay
    });

    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }

  return results;

}
