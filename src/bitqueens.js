var n = Number(process.argv[2]) || 6;

var bitQueens = function( n, i, cols, majorDiag, minorDiag) {
  if(i >= n) {
    return 1;
  }
  var count = 0;
  for(var j=0; j<n; j++){
    var mask = 1<<j;
    if (!(mask & cols || mask & majorDiag || mask & minorDiag)) {
      count += bitQueens(n, i+1, cols|mask, (majorDiag|mask)>>1, (minorDiag|mask)<<1);
    }
  }
  return count;
};

console.log( 'Number of '+n+'-queens solutions: ' + bitQueens(n, 0, 0, 0, 0) );