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

// QUADRATIC TIME COMPLEXITY
var differentRecurse = function(numPieces, board, row, conflictFunc, conflictObj, solutionsObject) {
  
  var solution;
  //CONSTANT
  if(numPieces >= board.get("n")){
    if (solutionsObject !== undefined) {
      solutionsObject.count++;
    } else {
      return board.rows();
    }
  } else {
    //if no, create new possibility with updated board and updated column and row info

    for(var i=row; i<board.get("n"); i++){
      for(var j=0; j<board.get("n"); j++){
        // var matrix = deepCopy(board.rows());
        board.togglePiece(i,j);
        if (!isEliminated(i,j, conflictObj)) {
          setEliminated(i,j,conflictObj,true);
          solution = differentRecurse(numPieces + 1, board, i+1, conflictFunc, conflictObj, solutionsObject);
          if (solutionsObject === undefined && solution) { // we are not counting, we just want one solution
            return solution;
          }
          setEliminated(i,j,conflictObj,false);
        }
        board.togglePiece(i,j);
      }
    }
  }
};



// QUADRATIC TIME COMPLEXITY
window.findNRooksSolution = function(n) {
  var solution;
  var numRooks = 0;
  var board = new Board({ 'n':n });


  var conflictObj = { cols:{}};

  // solution = countRecurse(numRooks, board, -1, 0, board.hasAnyRooksConflicts);
  solution = differentRecurse(numRooks, board, 0, board.hasAnyRooksConflicts, conflictObj);

  if(solution){
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  }
  return solution;
};

// QUADRATIC TIME COMPLEXITY
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutions = {};
  solutions.count = 0;
  var solutionCount; 

  var conflictObj = { cols:{} };

  var numRooks = 0;
  var board = new Board({ 'n':n });
  // countRecurse(numRooks, board, -1, 0, board.hasAnyRooksConflicts, solutions );
  differentRecurse(numRooks, board, 0, board.hasAnyRooksConflicts, conflictObj, solutions );

  solutionCount = solutions.count;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// QUADRATIC TIME COMPLEXITY
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var numQueens = 0;
  var board = new Board({ 'n':n });


  var conflictObj = { cols:{}, majorDiag:{}, minorDiag:{} };

  // solution = countRecurse(numQueens, board, -1, 0, board.hasAnyQueensConflicts);

  solution = differentRecurse(numQueens, board, 0, board.hasAnyQueensConflicts, conflictObj);

  if(solution){
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }
  return (new Board({'n':n})).rows();
};



// QUADRATIC TIME COMPLEXITY
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = {};
  solutions.count = 0;

  var solutionCount; 


  var conflictObj = { cols:{}, majorDiag:{}, minorDiag:{} };

  var numQueens = 0;
  var board = new Board({ 'n':n });
  // countRecurse(numQueens, board, -1, 0, board.hasAnyQueensConflicts, solutions);
  differentRecurse(numQueens, board, 0, board.hasAnyQueensConflicts, conflictObj, solutions);

  solutionCount = solutions.count;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
