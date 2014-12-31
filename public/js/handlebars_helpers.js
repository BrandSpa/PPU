Handlebars.registerHelper('checked', function(val1, val2) {
  var _ref;
  return (_ref = val1 === val2) != null ? _ref : {
    ' checked="checked"': ''
  };
});

Handlebars.registerHelper('shortenText', function(text, block) {
  return text.substring(0, 120) + " ...";
});

Handlebars.registerHelper('shortenText2', function(text, block) {
  return text.substring(0, 90);
});

Handlebars.registerHelper('dateFormat', function(context, block) {
  var f;
  if (window.moment) {
    f = block.hash.format || "DD/MM/YYYY";
    return moment(context).format(f);
  }
});

Handlebars.registerHelper('toUpperCase', function(str) {
  return str.toUpperCase();
});

Handlebars.registerHelper('getYear', function(context, block) {
  var f;
  if (window.moment) {
    f = block.hash.format || "YYYY";
    return moment(Date(context)).format(f);
  } else {
    return context;
  }
});
