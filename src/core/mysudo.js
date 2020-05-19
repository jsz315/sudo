var map = [];

main();


function main(){
    var timer = Date.now();
    init();
    // fill();
    wellGame();
    // create(0, 0);
    console.log(Date.now() - timer, "耗时");
    console.log(map);
}

function init(){
    for(var i = 0; i < 9; i++){
        map[i] = [];
        for(var j = 0; j < 9; j++){
            map[i][j] = 0;
        }
    }
}

function fill(){
    var pot = next();
    var times = 0;
    while(pot){
        var num = getUnusedNum(pot.row, pot.col);
        if(num){
            map[pot.row][pot.col] = num;
            pot = next();
        }
        else{
            pot = prev(pot.row, pot.col);
        }
        if(++times > 900){
            console.log("over");
            pot = null;
        }
    }
}

function next(){
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(!map[i][j]){
                return {
                    row: i,
                    col: j
                }
            }
        }
    }
    return null;
}

function prev(row, col){
    if(col == 0){
        return {
            row: row - 1,
            col: 8
        }
    }
    return {
        row: row,
        col: col - 1
    }
}

function getUnusedNum(row, col){
    var used = [];
    var i, j;

    var srow = Math.floor(row / 3) * 3;
    var scol = Math.floor(col / 3) * 3;

    for(i = 0; i < col; i++){
        if(map[row][i]){
            used.push(map[row][i]);
        }
    }

    for(i = 0; i < row; i++){
        if(map[i][col]){
            used.push(map[i][col]);
        }
    }

    for(i = srow; i < srow + 3; i++){
        for(j = scol; j < scol + 3; j++){
            if(map[i][j]){
                used.push(map[i][j]);
            }
        }
    }

    if(map[row][col]){
        used.push(map[row][col]);
    }

    var aim = [];
    for(i = 1; i <= 9; i++){
        if(used.indexOf(i) == -1){
            aim.push(i);
        }
    }
    if(aim.length){
        return aim[Math.floor(Math.random() * aim.length)];
    }
    return 0;
}


function create(row, col) {
    if(row >= 9) {
        console.log("over");
    }
    
    if(map[row][col] == 0) {
        for(var t = 1; t < 10; t++) {
            if(!checkUsed (row, col, t)){
                map[row][col] = t;
                // if(++col == 9){
                //     col = 0;
                //     row++;
                // }
                create(row + Math.floor((col + 1) / 9), (col + 1) % 9);//继续向下递归
                break;
            }
            map[row][col] = 0;//回溯
        }
        
    }else {
        // if(++col == 9){
        //     col = 0;
        //     row++;
        // }
        create(row + Math.floor((col + 1) / 9), (col + 1) % 9);
    }
}

function wellGame(){
    // for(var i = 1; i <= 9; i++){
    //     fillNum(i, 0, false);
    // }

    // var jump = 0;
    // for(var t = 0; t < 4; t++){
    //     console.log(t, "t=====")
    //     for(var j = 0; j < 4; j++){
    //         console.log(j, "j")
    //         if(j > 1){
    //             jump = 1;
    //             break;
    //         }
    //     }
    //     if(jump){
    //         break;
    //     }
    // }
}

var cnum = 1;
function nextFill(){
    fillNum(cnum++, 0, false);
}

function fillNum(num, id, isBack){
    if(id < 9 && id >= 0){
        var success = fillRect(num, id, isBack);
        if(success){
            fillNum(num, id + 1, false);
        }
        else{
            fillNum(num, id - 1, true);
        }
    }
}

function fillRect(num, id, isBack){
    var pot = getPot(id);
    var old = {row: -1, col: -1};
    var i, j;
    if(isBack){
        for(i = pot.row; i < pot.row + 3; i++){
            for(j = pot.col; j < pot.col + 3; j++){
                if(map[i][j] == num){
                    old = {
                        row: i,
                        col: j
                    };
                    map[i][j] = 0;
                    console.log("回溯重置数据");
                    break;
                }
            }
            if(old.row != -1){
                break;
            }
        }
    }
    
    for(i = pot.row; i < pot.row + 3; i++){
        for(j = pot.col; j < pot.col + 3; j++){
            if(map[i][j] == 0){
                if(i == old.row && j == old.col){
                    console.log("原来的位置")
                }
                else{
                    if(!checkUsed(i, j, num)){
                        map[i][j] = num;
                        return true;
                    }
                }
                
            }
        }
    }
    return false;
}

function getPot(id){
    var row = Math.floor(id / 3);
    var col = id % 3;
    return {
        row: row * 3,
        col: col * 3
    }
}

function checkUsed(row, col, num){
    var used = false;
    var i;

    // var srow = Math.floor(row / 3) * 3;
    // var scol = Math.floor(col / 3) * 3;

    for(i = 0; i < 9; i++){
        if(map[row][i] == num){
            used = true;
            break;
        }
    }

    for(i = 0; i < 9; i++){
        if(map[i][col] == num){
            used = true;
            break;
        }
    }

    // for(i = srow; i < srow + 3; i++){
    //     for(j = scol; j < scol + 3; j++){
    //         if(map[i][j] == num){
    //             used = true;
    //             break;
    //         }
    //     }
    // }

    return used;
}

export default {
    nextFill
}