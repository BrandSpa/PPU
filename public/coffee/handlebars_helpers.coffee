Handlebars.registerHelper 'checked', (val1, val2) ->
    return val1 == val2 ? ' checked="checked"' : ''

Handlebars.registerHelper 'shortenText', (text, block) ->
  text.substring(0, 120) + " ..."

Handlebars.registerHelper 'shortenText2', (text, block) ->
  text.substring(0, 90)

Handlebars.registerHelper 'dateFormat', (context, block) ->
  if window.moment
    f = block.hash.format || "MMM Do, YYYY";
    moment(Date(context)).format(f)
  else
    context
    
Handlebars.registerHelper 'toUpperCase',(str) ->
  str.toUpperCase()

Handlebars.registerHelper 'getYear', (context, block) ->
  if window.moment
    f = block.hash.format || "YYYY";
    moment(Date(context)).format(f)
  else
    context