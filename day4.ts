import {fetchInput} from "./Fetcher";
const url = process.argv[2];
fetchInput(url).then(data => cleanCamp(data.trim()));

function cleanCamp(data: string): number{
    let cleanPairs:string[] =  data.split('\n');
    let count:number =0;
    let count2:number = 0;
    cleanPairs.forEach( function(item: string, index: number, cleanPairs: string[]){
        let ranges = item.split(',');
        let range1 = Uint16Array.from(ranges[0].split('-').map(makeInts));
        let range2 = Uint16Array.from(ranges[1].split('-').map(makeInts));
        if(range1[0]<=range2[0] && range1[1]>=range2[1]){
            count = count+1;
            count2 = count2+1;
        }else if(range1[0]>=range2[0] && range1[1]<=range2[1]){
            count = count+1;
            count2 = count2+1;
        }else if(range1[0]<=range2[0] && range1[1]>=range2[0] ){
            count2 = count2+1;
        }else if(range1[0]<=range2[1] && range1[1]>=range2[1]){
            count2 = count2+1;
        }

    });
    console.log(count);
    console.log(count2);
    return count;
}

function makeInts(rangeBound:string):number{
    return parseInt(rangeBound);
}