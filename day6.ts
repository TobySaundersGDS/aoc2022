import {fetchInput} from "./Fetcher";
const url = 'https://adventofcode.com/2022/day/6/input';

fetchInput(url).then((data) => {
    return (getSig(data) + ' ' + getMess(data));
});

function getMess(signalString: string): number {
    let messWindow = new Array();
    let signal = signalString.split('');
    messWindow = signal.splice(0,13);
    let counter:number = 14;

    signal.every(function(thisSig:string, index:number, signal:string[]){
        let matches:boolean = false;
        let messSet = getSet(messWindow);

        if(messSet.size == 13){

            messWindow.every(function(thisWindowSig:string, index:number, messWindow:string[]){
                if(thisSig === thisWindowSig){
                    matches = true;
                    return true;
                }
                return true;
            });
        }else{
            matches = true;
        }
        if(matches){
            counter = counter + 1;
            messWindow.push(thisSig);
            messWindow.shift();
            return true;
        }else{
            return false;
        }
    });
    console.log(counter);
    return counter;
}
function getSig (signalString: string): number {
    let sigWindow = new Array();
    let signal = signalString.split('');
    sigWindow = signal.splice(0,3);
    let counter:number = 4;

    signal.every(function(thisSig:string, index1:number, signal:string[]){

        let matches:boolean = false;
        if(sigWindow[0] != sigWindow[1] &&
            sigWindow[0] != sigWindow[2] &&
            sigWindow[1] != sigWindow[2]){
            sigWindow.every(function(thisWindowSig:string, index:number, sigWindow:string[]){
                if(thisSig === thisWindowSig){
                    matches = true;
                    return true;
                }
                return true;
            });
        }else{
            matches = true;
        }
        if(matches){
            counter = counter + 1;
            sigWindow.push(thisSig);
            sigWindow.shift();
            return true;
        }else{
            return false;
        }
    })
    console.log(counter);
    return counter;
}

function getSet(messWindow: string[]): Set<any> {
    let thisWindow = new Set();
    messWindow.forEach(sig => thisWindow.add(sig));
    return thisWindow;
}