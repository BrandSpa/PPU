'use strict';

function extend(a, b) {
  for( var key in b ) {
    if( b.hasOwnProperty( key ) ) {
      if(typeof b[key] === "object") {
        a[key] = extend(a[key], b[key]);
      }
      else {
        a[key] = b[key];
      }
    }
  }
  return a;
};

export default extend;
