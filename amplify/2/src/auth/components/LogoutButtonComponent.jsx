import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { styles } from './ButtonStyles';

function ContainedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button color="primary" className={classes.button} onClick={props.onLogout}>
        Logout
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainedButtons);
