export function Input({setCapsCheck})
{
    return(
    <div>
        <input placeholder="Account ID"
            size="25" 
            className="input-login" 
            name="id"
            onClick={()=>{setCapsCheck(false)}}
            />
    </div>
    )
}