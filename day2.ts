let strategy1 = {
    'X': {'A': 4, 'B':1, 'C': 7 }, //rock
    'Y': {'A': 8, 'B':5, 'C': 2 }, //paper
    'Z': {'A': 3, 'B':9, 'C': 6 } //scissors
}
let strategy2 = {
    'X': {'A': 3, 'B':1, 'C': 2 }, //lose
    'Y': {'A': 4, 'B':5, 'C': 6 }, //draw
    'Z': {'A': 8, 'B':9, 'C': 7 } //win
}
function match(rounds: string){
    let fights = rounds.split('\n');
    let points1 = Int32Array.from(fights.map(score1));
    console.log(points1.reduce(tot));
    let points2 = Int32Array.from(fights.map(score2));
    console.log(points2.reduce(tot));
}
function score1(fight: String){
    return strategy1[fight[2]][fight[0]];
}
function score2(fight: String){
    return strategy2[fight[2]][fight[0]];
}
function tot(accumulator, currentValue) {
  return accumulator + currentValue;
}
const rounds = process.argv[2];
match(rounds);