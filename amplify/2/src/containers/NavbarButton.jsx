import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white'
  }
});

const MyLink = props => <Link to="/login" {...props} />;

function NavbarButton(props) {
  const { classes } = props;
  return (
    <Button color="primary" className={classes.button} component={MyLink}>
      Login
    </Button>
  );
}

export default withStyles(styles)(NavbarButton);
