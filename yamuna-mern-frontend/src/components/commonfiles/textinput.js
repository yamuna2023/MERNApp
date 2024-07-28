import '../index.css'

export function TextInput(props) {
    const { type, inputvalue, placeholder, onchangefunction ,heading,notrequired,maxlength} = props
    console.log(inputvalue)
    return (
        <div style={{marginTop:5}}>
            <p  className="commonparagraph" style={{textAlign:'left',marginLeft:'6%'}} >{heading}
            {!notrequired&&<span className="startext">*</span>}
            </p>

            <input
                className="commontextinpustyle"
                onChange={(event) => onchangefunction(event.target.value)}
                value={inputvalue}
                type={type}
                placeholder={placeholder}
                maxLength={maxlength}
            />
        </div>

    );
}