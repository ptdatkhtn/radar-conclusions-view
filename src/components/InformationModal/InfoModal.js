import React from "react";

const Icon = ({ size=45 }) => (
    <img src={require('./info-modal.svg').default} alt='mySvgImage' height={size} width={size}/> 
);

export default Icon;