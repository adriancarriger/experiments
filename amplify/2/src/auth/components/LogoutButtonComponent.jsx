import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { styles } from './ButtonStyles';

function ContainedButtons(props) {
  const { classes } = props;
  const defaultButton = (
    <Button color="primary" className={classes.button}>
      Logout
    </Button>
  );

  return <div onClick={props.onLogout}>{props.children || defaultButton}</div>;
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainedButtons);
