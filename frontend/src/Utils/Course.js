export default function getObj(arg1,arg2,arg3)
{
    if(arguments.length==2)return ({courseName: arg1,
            courseCredits: arg2,
            mon:0,tue:0,wed:0,thu:0,fri:0
    })
    else{
        const [fromYear, fromMonth, fromDay]= arg1.split('-');
        const fromDate = `${fromDay}-${fromMonth}-${fromYear}`;
        const [toYear, toMonth, toDay]= arg2.split('-');
        const toDate = `${toDay}-${toMonth}-${toYear}`;
        return ({from:fromDate,to:toDate,des:arg3})
    }
}