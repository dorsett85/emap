import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import SchoolIcon from "@material-ui/icons/School";
import CityIcon from "@material-ui/icons/LocationCity";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Popover from "@material-ui/core/Popover/Popover";

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali',
  },
  gridDiv: {
    width: 350,
    padding: 10,
    backgroundColor: '#EF9A9A'
  },
  card: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardContent: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 16
    },
  },
  cardTextDiv: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  cardText: {
    fontFamily: 'Mali',
    marginLeft: 5,
  }
});


const GameSelector = props => {
  const {classes} = props;

  return (
    <div>
      <ListItem
        button
        aria-owns='gameMenuPopover'
        aria-haspopup="true"
        onClick={props.onSelectGameClick}
      >
        <Avatar>
          <SchoolIcon/>
        </Avatar>
        <ListItemText primary="Select a game" classes={{primary: classes.maliFont}}/>
      </ListItem>
      <Popover
        id="gameMenuPopover"
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Card className={classes.gridDiv}>
          <Grid container spacing={8}>
            {props.games
              .map(game => game.title)
              .map((game, i) => (
              <Grid item xs={6} key={i}>
                <CardActionArea onClick={event => props.onCardClick(event, i)}>
                  <Card classes={{root: classes.card}}>
                    <CardContent classes={{root: classes.cardContent}}>
                      <div className={classes.cardTextDiv}>
                        <CityIcon/>
                        <span className={classes.cardText}>{game}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Popover>
    </div>

  );

};

export default withStyles(styles)(GameSelector)
