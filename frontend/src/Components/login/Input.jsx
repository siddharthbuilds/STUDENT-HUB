import "./Input.css"
export function Input({placeholder, type, setCapsCheck,size=25})
{
    return(
    <div>
        <input placeholder={placeholder}
            size={size} 
            className="input-login" 
            name="id"
            onClick={()=>{setCapsCheck(false)}}
            type={type}
            />
    </div>
    )
}