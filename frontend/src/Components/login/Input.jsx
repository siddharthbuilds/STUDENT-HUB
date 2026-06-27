import "./Input.css"
import { CalendarImage } from "../addsem/CalendarImage"
export function Input({placeholder, type, setCapsCheck,size=25,onChange,fontSize=20, backgroundColor="rgb(1,1,63)"})
{
    return(
    <div className="div-input">
        <input placeholder={placeholder}
            size={size} 
            className="input-login" 
            name="id"
            onClick={()=>{setCapsCheck?setCapsCheck(false):()=>{}}}
            onChange={onChange?onChange:()=>{}}
            type={type}
            style={{
                fontSize: `${Number(fontSize)}px`,
                backgroundColor: `${backgroundColor}`
            }}
            />
            {type=="date"&&<div className="div-calendar-input"><CalendarImage /></div>}
    </div>
    )
}