let x = 20;
let y = 20;
$('#go').click(start);

function cellClicked(e){
  let $cell = $(e.target);
  if($cell.hasClass('clicked')){
    $cell.removeClass('clicked');
  } else {
    $cell.addClass('clicked');
  }
  let y = e.target.parentNode.rowIndex;
  let x = e.target.cellIndex;

}


function getCell(i, j){
  return $('#cell_' + i + '_' + j);
}

function getNeighbors(i, j){
  let y = j;
  let x = i;
  let xe = x-1;
  let xw = x+1;
  let yn = y-1;
  let ys = y+1;
  let $ne = getCell(xe, yn);
  let $n = getCell(x, yn);
  let $nw = getCell(xw, yn);
  let $e = getCell(xe, y);
  let $w = getCell(xw, y);
  let $se = getCell(xe, ys);
  let $s = getCell(x, ys);
  let $sw = getCell(xw, ys);

  return [$ne, $n, $nw, $e, $w, $se, $s, $sw];
}

function countLiveNeighbors(i, j){
  let count = 0;
  let neighbors = getNeighbors(i, j);
  for(let i =0; i < neighbors.length; i++){
    if(neighbors[i].hasClass('clicked')){
      count ++;
    }
  }
  return count;
}

function buildGameBoard(x, y){
  let $board = $('<table>');
  for(var i = 0; i < y; i++){
    let $row = $('<tr>');
    $board.append($row);
    for (var j=0; j < x; j++){
      let $cell = $('<td>');
      $row.append($cell);
      $cell.attr('id', 'cell_' + j + '_' + i);
      $cell.on('click', cellClicked);
    }
  }
  $('#gameBoard').append($board);
  }

function toggleCells(x, y){
  for(var j = 0; j < y; j++){
    for(var i = 0; i < x; i++){
      let $cell = getCell(i, j);
      // let neighbors = getNeighbors($cell);
      let count = countLiveNeighbors(i, j);
      if($cell.hasClass('clicked')){
        if(count < 2 || count > 3){
          $cell.addClass('dead');
        }
      } else {
        if(count === 3) {
          $cell.addClass('dead_to_live')
        }
      }
    }
  }
}


function updateCells(){
  toggleCells(x, y);
  for(var j = 0; j < y; j++){
    for(var i = 0; i < x; i++){
      let $cell = getCell(i, j);
      if($cell.hasClass('dead')){
        $cell.removeClass('clicked');
        $cell.removeClass('dead');
      } if($cell.hasClass('dead_to_live')){
        $cell.addClass('clicked');
        $cell.removeClass('dead_to_live');
      }
    }

  }
  // var $src = $(currentCell.hasClass('clicked'));
  console.log('hi mom');
}

function start(x, y){
  setInterval(updateCells, 500);
}


buildGameBoard(x, y);
