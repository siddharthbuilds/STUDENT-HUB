import "./Input.css"
export function Input({placeholder, type, setCapsCheck})
{
    return(
    <div>
        <input placeholder={placeholder}
            size="25" 
            className="input-login" 
            name="id"
            onClick={()=>{setCapsCheck(false)}}
            type={type}
            />
    </div>
    )
}