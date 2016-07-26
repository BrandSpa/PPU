'use strict';
var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({

  componentDidMount: function() {
    var path = window.location.pathname;
    console.log(path);

    $('.admin-nav li a').each(function(item) {
      console.log($(this).attr('href'));
      if($(this).attr('href') == path) {
        $(this).addClass('active');
      }
    });
  },

  render: function() {
    return (
      <ul className="admin-nav" style={{'background': '#002855'}}>
        <li><a href="/dashboard">Abogados</a></li>
        <li><a href="/admin/lawyers/new">Crear Abogado</a></li>
        <li><a href="/admin/posts2">Noticias</a></li>
        <li><a href="/admin/posts/new">Crear Noticia</a></li>
        <li><a href="/admin/experiences2">Experiencias</a></li>
        <li><a href="/admin/experiences/new">Crear Experiencia</a></li>
        <li><a href="/admin/the-actual">El Actual Chile</a></li>
        <li><a href="/admin/the-actual/new">Crear El Actual Chile</a></li>
        <li><a href="/admin/the-actual-co">El Actual Colombia</a></li>
        <li><a href="/admin/the-actual-co/new">Crear El Actual Colombia</a></li>
        <li><a href="/admin/the-actual-pe">El Actual Perú</a></li>
        <li><a href="/admin/the-actual-pe/new">Crear El Actual Perú</a></li>
        <li><a href="/admin/nosotros">Nosotros</a></li>
        <li><a href="/admin/probono">Probono</a></li>
        <li><a href="/admin/trabaje-con-nosotros">Trabaje con Nosotros</a></li>
        <li><a href="/users/sign_out">Salir</a></li>
      </ul>
    );
  }
});
