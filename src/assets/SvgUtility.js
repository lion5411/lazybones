export const get3dotHeader = (color, isTorn)=>{
    return  <svg width="48" height="120" viewBox="0 0 48 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 120V0H4.68293L0 3V115.5L4.68293 120H48Z" fill={color}/>
                <circle cx="25" cy="26" r="7.5" fill="white" stroke="#2F2F2F" stroke-width="5"/>
                <circle cx="25" cy="58" r="7.5" fill="white" stroke="#2F2F2F" stroke-width="5"/>
                <circle cx="25" cy="90" r="7.5" fill="white" stroke="#2F2F2F" stroke-width="5"/>
                {isTorn && 
                <>
                    <line x1="2" y1="26.5" x2="19" y2="26.5" stroke="#2F2F2F" stroke-width="5"/>
                    <line x1="2" y1="57.5" x2="19" y2="57.5" stroke="#2F2F2F" stroke-width="5"/>
                    <line y1="89.5" x2="17" y2="89.5" stroke="#2F2F2F" stroke-width="5"/>
                </>
                }
            </svg>;
}

export const get4dotHeader = (color, isTorn)=>{
    return  <svg width="48" height="145" viewBox="0 0 48 145" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 145V0H4.68293L0 3.625V139.562L4.68293 145H48Z" fill={color}/>
                <circle cx="25" cy="25" r="7.5" fill="white" stroke="#2F2F2F" stroke-width="5"/>
                <circle cx="25" cy="57" r="7.5" fill="white" stroke="#2F2F2F" stroke-width="5"/>
                <circle cx="25" cy="89" r="7.5" fill="white" stroke="#2F2F2F" stroke-width="5"/>
                {isTorn && 
                <>
                    <line x1="2" y1="25.5" x2="19" y2="25.5" stroke="#2F2F2F" stroke-width="5"/>
                    <line x1="2" y1="56.5" x2="19" y2="56.5" stroke="#2F2F2F" stroke-width="5"/>
                    <line y1="88.5" x2="17" y2="88.5" stroke="#2F2F2F" stroke-width="5"/>
                    <line y1="119.5" x2="17" y2="119.5" stroke="#2F2F2F" stroke-width="5"/>
                </>
                }
                <circle cx="25" cy="120" r="7.5" fill="white" stroke="#2F2F2F" stroke-width="5"/>
            </svg>;    
}