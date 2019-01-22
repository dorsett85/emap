import React from "react";
import CityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import TerrainIcon from "@material-ui/icons/Terrain";


const GameIcon = props => (
  props.name.startsWith('city')
    ? <CityIcon/>
    : props.name.startsWith('country')
      ? <PublicIcon/>
      : props.name.startsWith('mtn')
        ? <TerrainIcon/>
        : null
);

export default GameIcon;
