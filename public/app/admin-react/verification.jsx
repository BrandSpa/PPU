'use strict';
var React = require('react');
var Modal = require('react-modal');

var customStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },

  content : {
    position                   : 'absolute',
    top                        : '100px',
    left                       : 0,
    right                      : 0,
    width: '500px',
    height: '500px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',
    padding                    : '20px'

  }
};

module.exports = React.createClass({

  render: function() {
    var show = this.props.show;
    return (
      <Modal
        isOpen={show}
        style={customStyle}
      >
        <button className="btn btn-danger" onClick={this.props.onContinue}>Continuar</button>
        <button className="btn btn-default" onClick={this.props.onCancel}>Cancelar</button>
      </Modal>
    )

  }
});
