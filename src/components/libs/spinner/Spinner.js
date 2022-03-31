import React from "react";

import { Bars } from "react-loader-spinner";

function Spinner(){
    return(
        <Bars 
            height="35"
            color='green'
            ariaLabel='loading'
        />
    )
}

export default Spinner;