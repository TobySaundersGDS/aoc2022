function pack(bags: string): number {
    let bag:string[] = bags.split('\n');
    let matches = Int32Array.from(bag.map(findMatch));
    return matches.reduce(tot);
}
function findMatch(bagContents: string): number{
    let compartment1 = bagContents.substring(0,(bagContents.length/2)).split('');
    let compartment2 = bagContents.substring((bagContents.length/2)).split('');
    let pile1:Set<string> = getSet(compartment1);
    let pile2:Set<string> = getSet(compartment2);
    let match:Set<string> = getMatch(pile1, pile2);
    let matches = 0;
    match.forEach((item, key, match) => {
        matches = matches + priorities[item];
    })
    return matches;
}
function getSet(compartment: string[]): Set<any> {
    let pile = new Set();
    compartment.forEach(thing => pile.add(thing));
    return pile;
}
function getMatch(pile1: Set<any>, pile2: Set<any>): Set<string> {
    let match:Set<string> = new Set();
    pile1.forEach((item1, key1, pile1) => {
        if(pile2.has(item1)){
            match.add(item1);
        }
    });
    return match;
}

function badge(bags: string) {
    let bag:string[] = bags.split('\n');
    let group:string[][] = [];
    bag.forEach(function(items: string, index: number, bag:string[]){
        if(index%3 == 0){
            group[Math.floor(index/3)] = [];
        }
        group[Math.floor(index/3)][index%3] = items;
    }, group);
    let badgeScores = Int32Array.from(group.map(findBadges));
    return badgeScores.reduce(tot);
}

function findBadges(bagGroup: string[]): number {
    let bag1 = bagGroup[0].split('');
    let bag2 = bagGroup[1].split('');
    let bag3 = bagGroup[2].split('');

    let matches:number = 0;
    let pile1:Set<string> = getSet(bag1);
    let pile2:Set<string> = getSet(bag2);
    let pile3:Set<string> = getSet(bag3);
    let firstMatch:Set<string> = getMatch(pile1, pile2);
    let secondMatch:Set<string> = getMatch(firstMatch, pile3);
    secondMatch.forEach(function(item, key, set){
        matches = matches + priorities[item];
    });

    return matches;
}

function tot(accumulator, currentValue) {
  return accumulator + currentValue;
}
let priorities = {
        'a':1,
        'b':2,
        'c':3,
        'd':4,
        'e':5,
        'f':6,
        'g':7,
        'h':8,
        'i':9,
        'j':10,
        'k':11,
        'l':12,
        'm':13,
        'n':14,
        'o':15,
        'p':16,
        'q':17,
        'r':18,
        's':19,
        't':20,
        'u':21,
        'v':22,
        'w':23,
        'x':24,
        'y':25,
        'z':26,
        'A':27,
        'B':28,
        'C':29,
        'D':30,
        'E':31,
        'F':32,
        'G':33,
        'H':34,
        'I':35,
        'J':36,
        'K':37,
        'L':38,
        'M':39,
        'N':40,
        'O':41,
        'P':42,
        'Q':43,
        'R':44,
        'S':45,
        'T':46,
        'U':47,
        'V':48,
        'W':49,
        'X':50,
        'Y':51,
        'Z':52
    }
const bags = process.argv[2];
console.log(pack(bags));
console.log(badge(bags));