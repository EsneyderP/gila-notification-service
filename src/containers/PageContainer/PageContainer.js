import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  pageContent: {
    margin: `${theme.spacing(2)}px auto`,
    textAlign: 'center',
    width: '100%',
  },
});

const PageContainer = ({
  classes,
  children,
  pageContainerClassName,
  contentWrapperClassName,
}) => {
  return (
    <div className={classnames(classes.pageContainer, pageContainerClassName)}>
      <div className={classnames(classes.pageContent, contentWrapperClassName)}>
        {children}
      </div>
    </div>
  );
};

PageContainer.defaultProps = {
  pageContainerClassName: '',
  contentWrapperClassName: null,
};

PageContainer.propTypes = {
  classes: PropTypes.shape({
    pageContainer: PropTypes.string,
    pageContent: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
  pageContainerClassName: PropTypes.string,
  contentWrapperClassName: PropTypes.string,
};

export default withStyles(styles)(PageContainer);
