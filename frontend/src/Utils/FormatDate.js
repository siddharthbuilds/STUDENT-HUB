export default function formatDate(date,showDay=false)
{
    const dateObj = new Date(date);
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });  

    const [y,,d] = date.split('-');

    if (showDay) return `${day} - ${month} ${d}, ${y}`;
    return `${month} ${d}, ${y}`

}