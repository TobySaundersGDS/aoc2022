import {fetchInput} from "./Fetcher";
const url = 'https://adventofcode.com/2022/day/10/input';

fetchInput(url).then((data) => {
    return (getSignalStrength(data.trim()));
});

function getSignalStrength(instructionList: String):number{
    let instructions = instructionList.split('\n');
    let totalSignalNow:number = 1;
    let totalCycles:number = 0;
    let totalSignalStrength:number = 0
    let done20:boolean = false;
    let done60:boolean = false;
    let done100:boolean = false;
    let done140:boolean = false;
    let done180:boolean = false;
    let done220:boolean = false;
    let done40:boolean = false;
    let done80:boolean = false;
    let done120:boolean = false;
    let done160:boolean = false;
    let done200:boolean = false;
    let done240:boolean = false;
    let crt:string = '';

    instructions.forEach(function(instruction:string, index:number, instructions){

        if(instruction.substring(0,4) == 'noop'){
            totalCycles = totalCycles+1;
            //console.log('noop ' + 'cycle count:' + totalCycles);
            if(!done40 && totalCycles > 40){ crt = crt + '\n'; done40 = true; }
            if(!done80 && totalCycles > 80){ crt = crt + '\n'; done80 = true;}
            if(!done120 && totalCycles > 120){ crt = crt + '\n'; done120 = true;}
            if(!done160 && totalCycles > 160){ crt = crt + '\n'; done160 = true;}
            if(!done200 && totalCycles > 200){ crt = crt + '\n'; done200 = true;}
            if(!done240 && totalCycles > 240){ crt = crt + '\n'; done240 = true;}

            if((((totalCycles)%40) >= (totalSignalNow )) && (((totalCycles)%40) <= (totalSignalNow+2 ))){
                crt = crt + '#';//  + '(' + totalSignalNow + ')';
            }else{
                crt = crt + '.';//  + '(' + totalSignalNow + ')';
            }

        }else{
            totalCycles = totalCycles + 1;
            if(!done40 && totalCycles > 40){ crt = crt + '\n'; done40 = true; }
            if(!done80 && totalCycles > 80){ crt = crt + '\n'; done80 = true;}
            if(!done120 && totalCycles > 120){ crt = crt + '\n'; done120 = true;}
            if(!done160 && totalCycles > 160){ crt = crt + '\n'; done160 = true;}
            if(!done200 && totalCycles > 200){ crt = crt + '\n'; done200 = true;}
            if(!done240 && totalCycles > 240){ crt = crt + '\n'; done240 = true;}
            if( (( (totalCycles) %40 ) >= (totalSignalNow )) && (((totalCycles)%40) <= (totalSignalNow+2 ))){
                crt = crt+'#';// + '(' + totalSignalNow + ')';
            }else{
                crt = crt+'.';//  + '(' + totalSignalNow + ')';
            }
            totalCycles = totalCycles+1;
            if(!done40 && totalCycles > 40){ crt = crt + '\n'; done40 = true; }
            if(!done80 && totalCycles > 80){ crt = crt + '\n'; done80 = true;}
            if(!done120 && totalCycles > 120){ crt = crt + '\n'; done120 = true;}
            if(!done160 && totalCycles > 160){ crt = crt + '\n'; done160 = true;}
            if(!done200 && totalCycles > 200){ crt = crt + '\n'; done200 = true;}
            if(!done240 && totalCycles > 240){ crt = crt + '\n'; done240 = true;}
            if((((totalCycles)%40) >= (totalSignalNow ) ) && (((totalCycles)%40) <= (totalSignalNow +2))){
                crt = crt+'#';//  + '(' + totalSignalNow + ')';
            }else{
                crt = crt+'.';//  + '(' + totalSignalNow + ')';
            }

        }
        if(!done20 && totalCycles >= 20){
            totalSignalStrength = totalSignalStrength + (20*totalSignalNow);
            done20=true;
        }
        if(!done60 && totalCycles >= 60){
            totalSignalStrength = totalSignalStrength + (60*totalSignalNow);
            done60=true;
        }
        if(!done100 && totalCycles >= 100){
            totalSignalStrength = totalSignalStrength + (100*totalSignalNow);
            done100=true;
        }
        if(!done140 && totalCycles >= 140){
            totalSignalStrength = totalSignalStrength + (140*totalSignalNow);
            done140=true;
        }
        if(!done180 && totalCycles >= 180){
            totalSignalStrength = totalSignalStrength + (180*totalSignalNow);
            done180=true;
        }
        if(!done220 && totalCycles >= 220){
            totalSignalStrength = totalSignalStrength + (220*totalSignalNow);
            done220=true;
        }
        console.log('totalSignalNow:'+totalSignalNow +' totalCycles:' + totalCycles);
        console.log(crt);

        if(instruction.substring(0,4) !== 'noop'){
            totalSignalNow = totalSignalNow + parseInt(instruction.substring(4));
        }
    })
    console.log(totalSignalStrength);
    console.log(crt);
    return totalSignalStrength;
}