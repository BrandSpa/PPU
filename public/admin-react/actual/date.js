'use strict';
import React from 'React';
import flatpickr from 'flatpickr';
import uid from 'uid';

flatpickr.init.prototype.l10n.weekdays = {
	shorthand: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
	longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
};

flatpickr.init.prototype.l10n.months = {
	shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
	longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
};

flatpickr.init.prototype.l10n.ordinal = () => {
	return "º";
};

flatpickr.init.prototype.l10n.firstDayOfWeek = 1;


export default React.createClass({
  getInitialState() {
    return {
      id: `flatpickr-${ uid() }`,
      lastDate: '',
			once: false
    }
  },

  getDefaultProps() {
    return {
			picker: null,
      id: ``,
      styles: '',
      placeholder: '',
      format: '',
      enableTime: false,
      time_24hr: false,
      altInput: false,
      altFormat: '',
      dateFormat: 'Y-m-d',
      default: new Date()
    }
  },

  triggerChange(dateObj, dateStr) {
    if(typeof this.props.onChange === 'function') {
      this.props.onChange(dateObj, dateStr);
    }
  },

  handleChange(dateObj, dateStr) {
    this.setState({lastDate: dateStr});
    this.triggerChange(dateObj, dateStr);
  },

  componentDidMount() {
		this.setPicker();
  },

	shouldComponenetUpdate() {
		return false;
	},

	componentWillReceiveProps(props) {
		let input = document.getElementById(this.state.id);
		input.value = props.default;
		if(!this.state.once) {
			this.setPicker();
			this.setState({once: true});
		}
	},

	setPicker() {
		let props = this.props;

		let picker = flatpickr(`#${this.state.id}`, {
      enableTime: props.enableTime,
      time_24hr: props.time_24hr,
      altFormat: props.altFormat,
      altInput: props.altInput,
      dateFormat: props.dateFormat,
      defaultDate: props.default,
      onChange: this.handleChange
    });

		this.setState({picker});
	},

  render() {
    return (
      <input
        id={this.state.id}
        placeholder={this.props.placeholder}
        className={`${this.props.styles}`}
      />
    )
  }
});
