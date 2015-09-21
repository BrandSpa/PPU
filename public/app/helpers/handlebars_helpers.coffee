Handlebars.registerHelper 'checked', (val1, val2) ->
    return val1 == val2 ? ' checked="checked"' : ''

Handlebars.registerHelper 'shortenText', (text, block) ->
  text.substring(0, 95) + " ..."

Handlebars.registerHelper 'shortenText2', (text, block) ->
  text.substring(0, 190)

Handlebars.registerHelper 'dateFormat', (context, block) ->
  if window.moment
    f = block.hash.format || "DD/MM/YYYY"
    moment(context).format(f)

Handlebars.registerHelper 'toUpperCase',(str) ->
  str.toUpperCase()

Handlebars.registerHelper 'getYear', (context, block) ->
  if window.moment
    f = block.hash.format || "YYYY";
    moment(context).format(f)
  else
    context

Handlebars.registerHelper 'getLangDomain', (url, block) ->
  if app.lang == 'en'
    return "en.ppulegal.com/#{url}#{block}"
  else
    return "http://ppulegal.com/#{url}#{block}"
