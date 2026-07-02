export default function getObj(arg1,arg2,arg3)
{
    if(arguments.length==2)return ({courseName: arg1,
            courseCredits: arg2,
            mon:0,tue:0,wed:0,thu:0,fri:0
    })
    else{
        return ({from:arg1,to:arg2,des:arg3})
    }
}