import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  gameForm: {
    paddingTop: 15
  },
  tableContainer: {
    paddingTop: 10,
    flexGrow: 1
  }
});


const CitiesPop = props => {
  const { classes } = props;

  // Construct the progress table
  const progress = props.selectedGame.progress;
  let table;
  if (progress.length) {
    table = (
      <Grid container className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Population</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {progress.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component={'th'} scope={'row'}>{row.name}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell numeric>{row.population}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
    );
  }

  return (
    <div>
      <form className={classes.gameForm} onSubmit={props.onSubmit}>
        <FormGroup>
          <TextField
            variant={'outlined'}
            label={'Search for a BIG city'}
            onInput={props.onInput}
            placeholder={'Type a city'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant={'contained'}
            type={'submit'}>
            Find City
          </Button>
        </FormGroup>
      </form>
      {props.guessMessage && (
        <Typography variant={'subheading'}>
          {props.guessMessage}
        </Typography>
      )}
      {table}
    </div>
  );

};

export default withStyles(styles)(CitiesPop);
