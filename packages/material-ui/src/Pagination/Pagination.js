import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge } from '@material-ui/utils';
import useThemeProps from '../styles/useThemeProps';
import paginationClasses, { getPaginationUtilityClass } from './paginationClasses';
import usePagination from '../usePagination';
import PaginationItem from '../PaginationItem';
import experimentalStyled from '../styles/experimentalStyled';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...styles[styleProps.variant],
      [`& .${paginationClasses.ul}`]: styles.ul,
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { classes, variant } = styleProps;

  const slots = {
    root: ['root', variant],
    ul: ['ul'],
  };

  return composeClasses(slots, getPaginationUtilityClass, classes);
};

const PaginationRoot = experimentalStyled(
  'nav',
  {},
  {
    name: 'MuiPagination',
    slot: 'Root',
    overridesResolver,
  },
)({});

const PaginationUl = experimentalStyled(
  'ul',
  {},
  {
    name: 'MuiPagination',
    slot: 'Ul',
  },
)({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }
  return `Go to ${type} page`;
}

const Pagination = React.forwardRef(function Pagination(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiPagination' });
  const {
    boundaryCount = 1,
    className,
    color = 'standard',
    count = 1,
    defaultPage = 1,
    disabled = false,
    getItemAriaLabel = defaultGetAriaLabel,
    hideNextButton = false,
    hidePrevButton = false,
    onChange,
    page,
    renderItem = (item) => <PaginationItem {...item} />,
    shape = 'circular',
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    size = 'medium',
    variant = 'text',
    ...other
  } = props;

  const { items } = usePagination({ ...props, componentName: 'Pagination' });

  const styleProps = {
    ...props,
    boundaryCount,
    color,
    count,
    defaultPage,
    disabled,
    getItemAriaLabel,
    hideNextButton,
    hidePrevButton,
    renderItem,
    shape,
    showFirstButton,
    showLastButton,
    siblingCount,
    size,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <PaginationRoot
      aria-label="pagination navigation"
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    >
      <PaginationUl className={classes.ul} styleProps={styleProps}>
        {items.map((item, index) => (
          <li key={index}>
            {renderItem({
              ...item,
              color,
              'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
              shape,
              size,
              variant,
            })}
          </li>
        ))}
      </PaginationUl>
    </PaginationRoot>
  );
});

// @default tags synced with default values from usePagination

Pagination.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: PropTypes.number,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The active color.
   * @default 'standard'
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'standard']),
  /**
   * The total number of pages.
   * @default 1
   */
  count: PropTypes.number,
  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: PropTypes.number,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func,
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: PropTypes.bool,
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: PropTypes.bool,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: PropTypes.func,
  /**
   * The current page.
   */
  page: PropTypes.number,
  /**
   * Render the item.
   *
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem: PropTypes.func,
  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: PropTypes.bool,
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: PropTypes.bool,
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: PropTypes.number,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'text']),
    PropTypes.string,
  ]),
};

export default Pagination;
