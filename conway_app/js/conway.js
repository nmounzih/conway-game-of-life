buildGameBoard(10, 10);


$('#start').click(updateCells);



function cellClicked(e){
  let $cell = $(e.target);
  // $cell.addClass('clicked');
  if($cell.hasClass('clicked')){
    $cell.removeClass('clicked');
  } else {
    $cell.addClass('clicked');
  }
  let y = e.target.parentNode.rowIndex;
  let x = e.target.cellIndex;

}

  // let neighbors = getNeighbors(e.target);
  // let count = countLiveNeighbors(neighbors);
  // console.log(neighbors);
  // console.log(count);
  // if(count < 2 || count > 3){
  //   $src.addClass('dead');
  // }
  // else if(count===3 && $src.hasClass('dead')){//might never happen
  //   $src.addClass('clicked');
  // }


function getCell(x, y){
  return $('#cell_' + x + '_' + y);
  console.log('getcell');
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
  console.log($board);
  }

function toggleCells(x, y){
  for(var i = 0; i < x; i++){
    for(var j = 0; j < y; j++){
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
  console.log('hey')
}


function updateCells(x, y){
  toggleCells(x, y);
  for(var i = 0; i < x; i++){
    for(var j = 0; j < y; j++){
      let $cell = getCell(i, j);
      if($cell.hasClass('dead')){
        $cell.removeClass('clicked');
        $cell.removeClass('dead');
      } if($cell.hasClass('dead_to_live')){
        $cell.addClass('clicked');
        $cell.removeClass('dead_to_live');
      }
      // let neighbors = getNeighbors($cell);
      // let count = countLiveNeighbors(neighbors);
      // if(count < 2 || count > 3){
      //   $src.addClass('dead');
      // }
      // else if(count===3 && $src.hasClass('dead')){  //might never happen
      //   $src.addClass('clicked');
      // }
    }

  }
  // var $src = $(currentCell.hasClass('clicked'));
  console.log('hi mom');
}

function getNeighbors(i, j){
  let y = i;
  let x = j;
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

function countLiveNeighbors(neighbors){
  let count = 0;
  for(let i =0; i < neighbors.length; i++){
    if(neighbors[i].hasClass('clicked')){
      count ++;
    }
  }
  return count;
}
