
export function ButtonComponent(props) {
    const { onClickFunction, title, isdisable } = props
    return (
        <div>
            <button onClick={() => onClickFunction()}
                // className='button'
                style={{ 
                backgroundColor: isdisable ? "grey" : "#0062ff",
                color: 'white',
                alignItems:'center',
                textAlign:'center',
                justifyContent:"center",
                borderWidth:0,
                fontSize:12,
                fontWeight:600,
                cursor:'pointer',
                marginTop: 0 ,padding:10,borderRadius:10,width:"50%"}}
                disabled={isdisable}
                >
                {title}
            </button>
        </div>

    );
}