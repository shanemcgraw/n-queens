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


var newPossibility = function(numRooks, board, row, column) {
  var solution;

  board.togglePiece(row, column);
  
  if (board.hasAnyRooksConflicts()) {
    return;
  }

  numRooks++;

  if(numRooks === board.get("n")){
    return board.rows();
  }else{

    //if no, create new possibility with updated board and updated column and row info
    for(var i=row+1; i<board.get("n"); i++){
      for(var j=0; j<board.get("n"); j++){
        // debugger;
        // console.log(board);
        var matrix = deepCopy(board.rows());
        solution = newPossibility(numRooks, new Board(matrix), i, j);
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
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var matrix = deepCopy(board.rows());
      solution = newPossibility(numRooks, new Board(matrix), i, j);
      if(solution){
        console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
        return solution;
      }
    } 
  } 

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
