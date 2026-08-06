export default function formatDate(date,showDay=false)
{
    const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });  
    const dayNum = dateObj.getDate();
    const year = dateObj.getFullYear();

    if (showDay) return `${dayName} - ${month} ${dayNum}, ${year}`;
    return `${month} ${dayNum}, ${year}`;

}