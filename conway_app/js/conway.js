let x = 10;
let y = 10;
$('#go').click(start);

function cellClicked(e){
  var $src = $(e.target);
  $src.toggleClass('clicked');
  console.log($src);
}

function getCell(x, y){
  return $('#cell_' + x + '_' + y);
}

function getNeighbors(i, j){
  let x = i;
  let y = j;
  let xe = x-1;
  let xw = x+1;
  let yn = y-1;
  let ys = y+1;
  let ne = getCell(xe, yn);
  let n = getCell(x, yn);
  let nw = getCell(xw, yn);
  let e = getCell(xe, y);
  let w = getCell(xw, y);
  let se = getCell(xe, ys);
  let s = getCell(x, ys);
  let sw = getCell(xw, ys);

  return [ne, n, nw, e, w, se, s, sw];
}

function countLiveNeighbors(i, j){
  let count = 0;
  let neighbors = getNeighbors(i, j)
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
  console.log($board);
  }

function updateMirrorCells(){
  for(var i = 0; i < x; i++){
    for(var j = 0; j < y; j ++){
      let $cell = getCell(i, j);
      // let neighbors = getNeighbors($cell);
      let count = countLiveNeighbors(i, j);
      if($cell.hasClass('clicked')){
        if(count < 2 || count > 3){
          // $cell.toggleClass('aboutToDie');
          $cell.addClass('aboutToDie');
          // $cell.removeClass('clicked');
          console.log($cell);
          console.log(count);
            }
          } else {
              if(count === 3){
              console.log('reborn worked');
              $cell.addClass('reBorn');
              console.log($cell);
          }
        }
      }
    }
  }


function updateCells(){
  updateMirrorCells();
  for(var j = 0; j < y; j++){
    for(var i = 0; i < x; i++){
      let $cell = getCell(i, j);
      if($cell.hasClass('aboutToDie')){
        // $cell.toggleClass('dead');
        $cell.removeClass('aboutToDie');
        $cell.addClass('dead');
        console.log($cell);
      } else if($cell.hasClass('reBorn')){
        $cell.addClass('clicked');
        $cell.removeClass('reBorn');
        console.log($cell);
        // $cell.removeClass('reBorn');
      }
    }

  }
  console.log('hi mom');
}

function start(x, y){
  setInterval(updateCells, 500);
}

buildGameBoard(x, y);
