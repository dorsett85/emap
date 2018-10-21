import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import SchoolIcon from "@material-ui/icons/School";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali',
  }
});


const GameSelector = props => {
  const {classes} = props;

  return (
    <div>
      <ListItem
        button
        aria-haspopup="true"
        aria-controls="gameMenu"
        aria-label="SelectGame"
        onClick={props.onClickListItem}
      >
        <Avatar>
          <SchoolIcon />
        </Avatar>
        <ListItemText primary="Select a game" secondary={props.selectedGame} classes={{primary: classes.maliFont}}/>
      </ListItem>
      <Menu
          id="gameMenu"
          anchorEl={props.anchorEl}
          open={Boolean(props.anchorEl)}
          onClose={props.onClose}
        >
        {props.games.map((game, i) => (
          <MenuItem
            key={game}
            selected={i === props.selectedIndex}
            onClick={props.onMenuItemClick}
          >
            {game}
          </MenuItem>
        ))}
        </Menu>
    </div>

  );

};

export default withStyles(styles)(GameSelector)