import React from "react";
import "./After_hostit.css"


const Info= () =>{

        return(
            <>
            <div class="idf">
            <div class="idd">
            <div>
            <h2 class="hoi">Please Note Down Below ID <i class="fas fa-hand-point-down"></i></h2>
            <h1 class="hostid">{localStorage.getItem('hostid')}</h1>
            </div>
            <div>
            <h2>Your voting will be End in <i class="fas fa-stopwatch"></i></h2>
            <h1>{localStorage.getItem('time')}</h1>
            </div>
            </div>
            <button class="idm">Home</button>
            </div>
            </>
        )
    
}
export default Info;