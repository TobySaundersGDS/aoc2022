function day1(input: string){
    let eachElf = input.split('\n\n');
    let totalElf = Int32Array.from(eachElf.map(addTheElf));
    totalElf = totalElf.sort();
    totalElf = totalElf.reverse();
    let max = totalElf[0]
    let max3 = totalElf[0]+totalElf[1]+totalElf[2];
    console.log(max);
}
function addTheElf( theElf: string): number{
    let food = theElf.split('\n');
    food.forEach(addTheFood)
    return parseInt(food[0]);
}
function addTheFood(item, index, food){
    if(index == 0){
        food[0] = parseInt(item)
    }else{
        food[0] = food[0] + parseInt(item);
    }
}

const input = process.argv[2];
day1part1(input);
