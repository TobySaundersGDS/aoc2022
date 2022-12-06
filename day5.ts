import {fetchInput} from "./Fetcher";
const url = process.argv[2];

fetchInput(url).then((data) => {
        let crates:string[][] = new Array();
        let crates2:string[][] = new Array();
        makeCrates(data.substring(0, data.indexOf('m') ), crates, crates2);
        moveCrates(data.substring( data.indexOf('m') ).trim(), crates, crates2);
    });

function moveCrates(moves: string, crates:string[][], crates2:string[][]):string {
    //console.log(moves);
    let moveList:string[] = moves.split('\n');
    //console.log(moveList);
    let bothCrates = new Array();
    bothCrates[0] = crates;
    bothCrates[1] = crates2;

    console.log(bothCrates);

    moveList.forEach(function(move: string, index: number, moveList: string[]){
        let numberToMove:number = parseInt(move.substring(5));
        let fromStack:number = parseInt(move.substring(12));
        let toStack:number = parseInt(move.substring(17));
        changeStack(numberToMove, fromStack, toStack, bothCrates[0], bothCrates[1]);

    }, bothCrates);
    let tops1 = '';
    let tops2 = '';
    for(let j=1; j <=9; j++){
        tops1 = tops1 + bothCrates[0][j].pop();
        tops2 = tops2 + bothCrates[1][j].pop();
    }
    console.log(tops1 + ' ' + tops2 );
    return tops1 + ' ' + tops2;
}

function makeCrates(cratePlan: string, crates:string[][], crates2:string[][]){
    for(let j=1; j <=9; j++){
        crates[j] = new Array();
        crates2[j] = new Array();
    }
    for(let i=0; i < cratePlan.length; i++){
        if(cratePlan[i] !== ' ' &&
        cratePlan[i] !== '[' &&
        cratePlan[i] !== ']' &&
        cratePlan[i] !== '\n' ){
            if(cratePlan[i] == '1'){
                break;
            }
            crates[(((i%36)+3)/4)].unshift(cratePlan[i]);
            crates2[(((i%36)+3)/4)].unshift(cratePlan[i]);
        }
    }
}
function changeStack(numberToMove: number, fromStack: number, toStack: number, crates: string[][], crates2: string[][]){
    let blockOfCrates = new Array();
    for(let i = 0; i<numberToMove; i++ ){
        crates[toStack].push(crates[fromStack].pop());//solution1
        blockOfCrates.unshift(crates2[fromStack].pop());
    }
    crates2[toStack] = crates2[toStack].concat(blockOfCrates);
}