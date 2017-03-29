function cellClicked(e){
  var $src = $(e.target);
  $src.addClass('clicked');
  console.log($src);
  let neighbors = getNeighbors(e.target);
  let count = countLiveNeighbors(neighbors);
  console.log(count);
  if(count < 2 || count > 3){
    $src.addClass('dead');
  }
  else if(count===3 && $src.hasClass('dead')){//might never happen
    $src.addClass('clicked');
  }
}

function deadOrAlive(cell){
  
}

function getCell(x, y){
  return $('#cell_' + x + '_' + y);
}

function getNeighbors(currentCell){
  let y = currentCell.parentNode.rowIndex;
  let x = currentCell.cellIndex;
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

function countLiveNeighbors(neighbors){
  let count = 0;
  for(let i =0; i < neighbors.length; i++){
    if(neighbors[i].hasClass('clicked')){
      count ++;
    }
  }
  return count;
}

// function killCell(e, neighbors){
//   let count = 0;
//   for(let i = 0; i < neighbors.length; i++){
//     if(neighbors[i].hasClass('clicked')){
//       count ++;
//     if(count > 0){
//       e.target.addClass('dead');
//     }
//     }
//     }
//     return e.target
//   }



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


buildGameBoard(10, 10)
