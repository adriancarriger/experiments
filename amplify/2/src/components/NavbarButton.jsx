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

function NavbarButton(props) {
  const { classes, to } = props;
  const MyLink = props => <Link to={to} {...props} />;

  return (
    <Button color="primary" className={classes.button} component={MyLink}>
      {props.children}
    </Button>
  );
}

export default withStyles(styles)(NavbarButton);
