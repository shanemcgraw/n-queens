/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// CONSTANT TIME COMPLEXITY
isEliminated = function(i, j, conflictObj) {
  var columnConflict = conflictObj.cols[j];
  if (conflictObj.majorDiag) {
    return columnConflict ||
    conflictObj.majorDiag[ Board.prototype._getFirstRowColumnIndexForMajorDiagonalOn(i,j)] ||
    conflictObj.minorDiag[ Board.prototype._getFirstRowColumnIndexForMinorDiagonalOn(i,j)] ;
  } else {
    return columnConflict;
  }
};

// CONSTANT TIME COMPLEXITY
setEliminated = function(i, j, conflictObj, onOrOff) {
  conflictObj.cols[j] = onOrOff;
  if (conflictObj.majorDiag) {
    conflictObj.majorDiag[ Board.prototype._getFirstRowColumnIndexForMajorDiagonalOn(i,j) ] = onOrOff;
    conflictObj.minorDiag[ Board.prototype._getFirstRowColumnIndexForMinorDiagonalOn(i,j)] = onOrOff;
  }
};


// EXPONENTIAL TIME COMPLEXITY
window.findNRooksSolution = function(n) {
  var solution;
  var numRooks = 0;
  var board = new Board({ 'n':n });


  var conflictObj = { cols:{}};
  solution = fastFind(n, 0, conflictObj, board); 

  if(solution){
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  }
  return solution;
};

// EXPONENTIAL TIME COMPLEXITY
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutions = {};
  solutions.count = 0;
  var solutionCount; 

  var conflictObj = { cols:{} };

  var numRooks = 0;
  var board = new Board({ 'n':n });

  solutionCount = fastCount(n, 0, conflictObj);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// EXPONENTIAL TIME COMPLEXITY
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var numQueens = 0;
  var board = new Board({ 'n':n });


  var conflictObj = { cols:{}, majorDiag:{}, minorDiag:{} };
  solution = fastFind(n, 0, conflictObj, board); 

  if(solution){
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }
  return (new Board({'n':n})).rows();
};



// EXPONENTIAL TIME COMPLEXITY
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = {};
  solutions.count = 0;

  var solutionCount; 


  var conflictObj = { cols:{}, majorDiag:{}, minorDiag:{} };

  var numQueens = 0;
  var board = new Board({ 'n':n });
  solutionCount = bitQueens(n, 0, 0,0,0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


window.fastCount = function(n, i, conflictObj) {
if(i >= n){
    return 1;
} else {
  var count = 0;
  for(var j=0; j<n; j++){
      if (!isEliminated(i,j, conflictObj)) {
        setEliminated(i,j,conflictObj,true);
        count += fastCount(n, i+1, conflictObj);
        setEliminated(i,j,conflictObj,false);
      }
    }
    return count;
  }
};


window.fastFind = function( n, i, conflictObj, board) {
if(i >= n){
    return board.rows();
} else {
  var solution;
  for(var j=0; j<n; j++){
      if (!isEliminated(i,j, conflictObj)) {
        setEliminated(i,j,conflictObj,true);
        board.togglePiece(i,j);
        
        solution = fastFind(n, i+1, conflictObj, board);
        if (solution) {
          return solution;
        }
        
        board.togglePiece(i,j);
        setEliminated(i,j,conflictObj,false);
      }
    }
  }
};



window.bitQueens = function( n, i, cols, majorDiag, minorDiag) {
  if(i >= n) {
    return 1;
  }
  var count = 0;
  for(var j=0; j<n; j++){
    var mask = 1<<j;
    if (!(mask & ( majorDiag | cols | minorDiag))) {
      count += bitQueens(n, i+1, cols|mask, (majorDiag|mask)>>1, (minorDiag|mask)<<1);
    }
  }
  return count;
};

