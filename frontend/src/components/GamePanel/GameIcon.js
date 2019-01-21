import React from "react";
import CityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";


const GameIcon = props => (
  props.name.startsWith('city')
    ? <CityIcon/>
    : props.name.startsWith('country')
      ? <PublicIcon/>
      : null
);

export default GameIcon;
