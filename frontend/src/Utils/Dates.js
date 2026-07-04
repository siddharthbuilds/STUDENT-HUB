export default function getSatDates (Date1, Date2)
{
    const [startYear,startMonth,startDay] = Date1.split('-').map(Number);
    const startDate = new Date (startYear,startMonth-1,startDay);

    const [endYear,endMonth,endDay] = Date2.split('-').map(Number);
    const endDate = new Date (endYear,endMonth-1,endDay);

    let saturdayList = [];

    let currentDate = startDate;

    while(true)
    {
        let day = currentDate.getDay();
        if (day==6)
        {
            break;
        }
        else{
            currentDate.setDate(currentDate.getDate()+1);
        }
    }

    while (currentDate <= endDate) {
    saturdayList.push(new Date(currentDate)); // Store a copy of the date
    currentDate.setDate(currentDate.getDate() + 7);
  }

     return saturdayList.map(dayObj => {
    const y = dayObj.getFullYear();
    const m = String(dayObj.getMonth() + 1).padStart(2, '0');
    const d = String(dayObj.getDate()).padStart(2, '0');
    return {uuid: crypto.randomUUID(),
            date:`${y}-${m}-${d}`,
            displayDate:`${d}-${m}-${y}`,
            status:-1,
            order:null
            };
  });
}