import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Table, TableHead, TableBody, TableRow, TableCell} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  maliFont: {
    fontFamily: 'Mali'
  },
  gameForm: {
    paddingTop: 15,
    paddingBottom: 10
  },
  textInput: {
    height: 8
  },
  table: {
    marginTop: 10,
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


const CityPop = props => {
  const {classes} = props;

  // Construct the progress table
  const progress = props.selectedGame.progress;
  let table;
  if (progress.length) {
    table = (
      <Paper>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRowSm>
              <TableCellSm className={classes.tableHeadCell}>City</TableCellSm>
              <TableCellSm align={'right'} className={classes.tableHeadCell}>Area Area (sq. mi.)</TableCellSm>
              <TableCellSm align={'right'} className={classes.tableHeadCell}>Rank</TableCellSm>
            </TableRowSm>
          </TableHead>
          <TableBody>
            {progress.map(row => {
              return (
                <TableRowSm className={classes.oddTableRow} key={row.id}>
                  <TableCellSm component={'th'} scope={'row'}>{row.name}</TableCellSm>
                  <TableCellSm align={'right'}>{row.area.toLocaleString()}</TableCellSm>
                  <TableCellSm align={'right'}>{row.rank}</TableCellSm>
                </TableRowSm>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <form className={classes.gameForm} onSubmit={props.onSubmit}>
          <FormGroup>
            <TextField
              variant={'outlined'}
              label={'Search for a BIG country'}
              onInput={props.onInput}
              placeholder={'e.g., Russia'}
              InputProps={{classes: {input: classes.textInput}}}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant={'contained'}
              type={'submit'}>
              Find Country
            </Button>
          </FormGroup>
        </form>
        {table}
      </Grid>
    </Grid>
  );

};

export default withStyles(styles)(CityPop);
