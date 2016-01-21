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


var rookRecurse = function(numRooks, board, row, column) {
  var solution;
  if (row > -1) {
    board.togglePiece(row, column);
    
    if (board.hasAnyRooksConflicts()) {
      return;
    }

    numRooks++;
  }
  if(numRooks === board.get("n")){
    return board.rows();
  }else{

    //if no, create new possibility with updated board and updated column and row info
    for(var i=row+1; i<board.get("n"); i++){
      for(var j=0; j<board.get("n"); j++){
        var matrix = deepCopy(board.rows());
        solution = rookRecurse(numRooks, new Board(matrix), i, j);
        if(solution){
          return solution;
        }
      }
    }
  }
};


var queenRecurse = function(numQueens, board, row, column) {
  var solution;
  if (row > -1) {
    board.togglePiece(row, column);
    
    if (board.hasAnyQueensConflicts()) {
      return;
    }

    numQueens++;
  }
  if(numQueens === board.get("n")){
    return board.rows();
  }else{

    //if no, create new possibility with updated board and updated column and row info
    for(var i=row+1; i<board.get("n"); i++){
      for(var j=0; j<board.get("n"); j++){
        var matrix = deepCopy(board.rows());
        solution = queenRecurse(numQueens, new Board(matrix), i, j);
        if(solution){
          return solution;
        }
      }
    }
  }
};


window.findNRooksSolution = function(n) {
  var solution;
  var numRooks = 0;
  var board = new Board({ 'n':n });

  solution = rookRecurse(numRooks, board, -1, 0);
  if(solution){
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  }
  return solution;
};


var rookCountRecurse = function(numRooks, board, row, column, solutionsObject) {
  var solution;
  if (row > -1) {
    board.togglePiece(row, column);
    
    if (board.hasAnyRooksConflicts()) {
      return;
    }

    numRooks++;
  }
  if(numRooks === board.get("n")){
    solutionsObject.count++;
  }else{

    //if no, create new possibility with updated board and updated column and row info
    for(var i=row+1; i<board.get("n"); i++){
      for(var j=0; j<board.get("n"); j++){
        var matrix = deepCopy(board.rows());
        rookCountRecurse(numRooks, new Board(matrix), i, j, solutionsObject);
      }
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutions = {};
  solutions.count = 0;

  var solutionCount; 

  var numRooks = 0;
  var board = new Board({ 'n':n });
  rookCountRecurse(numRooks, board, -1, 0, solutions);

  solutionCount = solutions.count;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var numQueens = 0;
  var board = new Board({ 'n':n });

  solution = queenRecurse(numQueens, board, -1, 0);

  if(solution){
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }
  return (new Board({'n':n})).rows();
};


var queenCountRecurse = function(numQueens, board, row, column, solutionsObject) {
  var solution;
  if (row > -1) {
    board.togglePiece(row, column);
    if (board.hasAnyQueensConflicts()) {
      return;
    }
    numQueens++;
  }
  if(numQueens === board.get("n")){
    solutionsObject.count++;
  }else{
    //if no, create new possibility with updated board and updated column and row info
    for(var i=row+1; i<board.get("n"); i++){
      for(var j=0; j<board.get("n"); j++){
        var matrix = deepCopy(board.rows());
        queenCountRecurse(numQueens, new Board(matrix), i, j, solutionsObject);
      }
    }
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = {};
  solutions.count = 0;

  var solutionCount; 

  var numQueens = 0;
  var board = new Board({ 'n':n });
  queenCountRecurse(numQueens, board, -1, 0, solutions);

  solutionCount = solutions.count;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
