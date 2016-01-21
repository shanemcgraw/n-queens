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

// QUADRATIC TIME COMPLEXITY
var deepCopy = function(array){
  var copied = [];

  array.forEach(function(row, i){
    copied.push([]);
    row.forEach(function(element) {
      copied[i].push(element);
    });
  });

  return copied;
};


// EXPONENTIAL TIME COMPLEXITY
var differentRecurse = function(numPieces, board, row, conflictFunc, solutionsObject) {
  var solution;
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
        if (!conflictFunc.apply(board) ) {
          solution = differentRecurse(numPieces + 1, board, i+1, conflictFunc, solutionsObject);
          if (solutionsObject === undefined && solution) { // we are not counting, we just want one solution
            return solution;
          }
        }
        board.togglePiece(i,j);
      }
    }
  }
};



// EXPONENTIAL TIME COMPLEXITY
window.findNRooksSolution = function(n) {
  var solution;
  var numRooks = 0;
  var board = new Board({ 'n':n });

  // solution = countRecurse(numRooks, board, -1, 0, board.hasAnyRooksConflicts);
  solution = differentRecurse(numRooks, board, 0, board.hasAnyRooksConflicts);

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

  var numRooks = 0;
  var board = new Board({ 'n':n });
  // countRecurse(numRooks, board, -1, 0, board.hasAnyRooksConflicts, solutions );
  countRecurse(numRooks, board, 0, 0, board.hasAnyRooksConflicts, solutions );

  solutionCount = solutions.count;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// EXPONENTIAL TIME COMPLEXITY
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var numQueens = 0;
  var board = new Board({ 'n':n });

  // solution = countRecurse(numQueens, board, -1, 0, board.hasAnyQueensConflicts);

  solution = differentRecurse(numQueens, board, 0, board.hasAnyQueensConflicts);

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

  var numQueens = 0;
  var board = new Board({ 'n':n });
  // countRecurse(numQueens, board, -1, 0, board.hasAnyQueensConflicts, solutions);
  differentRecurse(numQueens, board, 0, board.hasAnyQueensConflicts, solutions);

  solutionCount = solutions.count;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
