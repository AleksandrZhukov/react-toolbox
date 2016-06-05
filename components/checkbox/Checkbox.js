import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { CHECKBOX } from '../identifiers.js';
import rippleFactory from '../ripple/Ripple.js';
import checkFactory from './Check.js';

const factory = (Check) => {
  class Checkbox extends Component {
    static propTypes = {
      checked: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      label: PropTypes.any,
      onChange: PropTypes.func,
      theme: PropTypes.shape({
        disabled: PropTypes.string,
        field: PropTypes.string,
        input: PropTypes.string,
        ripple: PropTypes.string
      })
    };

    static defaultProps = {
      checked: false,
      className: '',
      disabled: false
    };

    handleToggle = (event) => {
      if (event.pageX !== 0 && event.pageY !== 0) this.blur();
      if (!this.props.disabled && this.props.onChange) {
        this.props.onChange(!this.props.checked, event);
      }
    };

    blur () {
      this.refs.input.blur();
    }

    focus () {
      this.refs.input.focus();
    }

    render () {
      const { onChange, theme, children, label, ...others } = this.props; //eslint-disable-line no-unused-vars
      const className = classnames(theme.field, {
        [theme.disabled]: this.props.disabled
      }, this.props.className);
      const checkboxLabel = children ? children : label;

      return (
        <label data-react-toolbox='checkbox' className={className}>
          <input
            {...others}
            className={theme.input}
            onClick={this.handleToggle}
            readOnly
            ref='input'
            type='checkbox'
          />
          <Check
            checked={this.props.checked}
            disabled={this.props.disabled}
            rippleClassName={theme.ripple}
            theme={this.props.theme}
          />
          {checkboxLabel ? <span data-react-toolbox='label' className={theme.text}>{checkboxLabel}</span> : null}
        </label>
      );
    }
  }

  return Checkbox;
};

const Check = checkFactory(rippleFactory({ centered: true, spread: 2.6}));
const Checkbox = factory(Check);
export default themr(CHECKBOX)(Checkbox);
export { factory as checkboxFactory };
export { Checkbox };
