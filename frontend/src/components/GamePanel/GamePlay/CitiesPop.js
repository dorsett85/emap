import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    paddingTop: 15,
    paddingBottom: 10
  },
  table: {
    marginTop: 10
  },
  tableHead: {
    backgroundColor: theme.palette.common.black
  },
  tableHeadCell: {
    color: theme.palette.common.white
  },
  oddTableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  }
});

const TableRowSm = withStyles({
  root: {
    height: '35px'
  }
})(TableRow);

const TableCellSm = withStyles({
  root: {
    padding: '8px'
  }
})(TableCell);


const CitiesPop = props => {
  const { classes } = props;

  // Construct the progress table
  const progress = props.selectedGame.progress;
  let table;
  if (progress.length) {
    table = (
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRowSm>
            <TableCellSm className={classes.tableHeadCell}>City</TableCellSm>
            <TableCellSm className={classes.tableHeadCell}>Population</TableCellSm>
            <TableCellSm className={classes.tableHeadCell}>Rank</TableCellSm>
          </TableRowSm>
        </TableHead>
        <TableBody>
          {progress.map(row => {
            return (
              <TableRowSm className={classes.oddTableRow} key={row.id}>
                <TableCellSm component={'th'} scope={'row'}>{row.name}</TableCellSm>
                <TableCellSm>{row.population}</TableCellSm>
                <TableCellSm>{row.rank}</TableCellSm>
              </TableRowSm>
            );
          })}
        </TableBody>
      </Table>
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
