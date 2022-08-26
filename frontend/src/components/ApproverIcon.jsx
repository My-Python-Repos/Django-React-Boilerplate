import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import React from 'react';

export default function ApproverIcon({ approver }) {
  return (
    <div>
      {approver ? (
        <Tooltip title={approver}>
          <div>
            <CheckIcon color="primary" />
          </div>
        </Tooltip>
      ) : '-'}
    </div>
  );
}

ApproverIcon.propTypes = {
  approver: PropTypes.string.isRequired,
};
