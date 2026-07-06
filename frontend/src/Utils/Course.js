export default function getObj(arg1,arg2,arg3)
{
    if(arguments.length==2)return (
        {   uuid:crypto.randomUUID(),
            courseName: arg1,
            courseCredits: arg2,
            mon:0,tue:0,wed:0,thu:0,fri:0
        }
    )
    else{
        const [fromYear, fromMonth, fromDay]= arg1.split('-');
        const fromDate = `${fromYear}-${fromMonth}-${fromDay}`;
        const [toYear, toMonth, toDay]= arg2.split('-');
        const toDate = `${toYear}-${toMonth}-${toDay}`;
        return (
            {
                uuid:crypto.randomUUID(),
                from:fromDate,
                to:toDate,
                description:arg3
            }
        )
    }
}