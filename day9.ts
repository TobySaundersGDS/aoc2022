import {fetchInput} from "./Fetcher";
const url = 'https://adventofcode.com/2022/day/9/input';

fetchInput(url).then((data) => {
    return (getVisitedSquares(data.trim()));
});

function getVisitedSquares(moves:string):number{
    let theMoves:string[] = moves.split('\n');
    console.log(theMoves);
    //let theStart = new Square(0,0);

    let theHead:RopeEnd = new RopeEnd();
    theHead.currentPosition = new Square(0,0);
    theHead.visitedSquares = new Set();
    theHead.visitedSquares.add(theHead.currentPosition.getNumberString());
    theHead.name = 'TheHead';
    theHead.isTail = false;

    let knotOne:RopeEnd = new RopeEnd();
    knotOne.currentPosition = new Square(0,0);
    knotOne.visitedSquares = new Set();
    knotOne.visitedSquares.add(knotOne.currentPosition.getNumberString());
    knotOne.name='KnotOne';
    knotOne.isTail = false;

    let knotTwo:RopeEnd = new RopeEnd();
    knotTwo.currentPosition = new Square(0,0);
    knotTwo.visitedSquares = new Set();
    knotTwo.visitedSquares.add(knotTwo.currentPosition.getNumberString());
    knotTwo.name='KnotTwo';
    knotTwo.isTail = false;

    let knotThree:RopeEnd = new RopeEnd();
    knotThree.currentPosition = new Square(0,0);
    knotThree.visitedSquares = new Set();
    knotThree.visitedSquares.add(knotThree.currentPosition.getNumberString());
    knotThree.name='KnotThree';
    knotThree.isTail = false;

    let knotFour:RopeEnd = new RopeEnd();
    knotFour.currentPosition = new Square(0,0);
    knotFour.visitedSquares = new Set();
    knotFour.visitedSquares.add(knotFour.currentPosition.getNumberString());
    knotFour.name='KnotFour';
    knotFour.isTail = false;

    let knotFive:RopeEnd = new RopeEnd();
    knotFive.currentPosition = new Square(0,0);
    knotFive.visitedSquares = new Set();
    knotFive.visitedSquares.add(knotFive.currentPosition.getNumberString());
    knotFive.name='KnotFive';
    knotFive.isTail = false;

    let knotSix:RopeEnd = new RopeEnd();
    knotSix.currentPosition = new Square(0,0);
    knotSix.visitedSquares = new Set();
    knotSix.visitedSquares.add(knotSix.currentPosition.getNumberString());
    knotSix.name='KnotSix';
    knotSix.isTail = false;

    let knotSeven:RopeEnd = new RopeEnd();
    knotSeven.currentPosition = new Square(0,0);
    knotSeven.visitedSquares = new Set();
    knotSeven.visitedSquares.add(knotSeven.currentPosition.getNumberString());
    knotSeven.name='KnotSeven';
    knotSeven.isTail = false;

    let knotEight:RopeEnd = new RopeEnd();
    knotEight.currentPosition = new Square(0,0);
    knotEight.visitedSquares = new Set();
    knotEight.visitedSquares.add(knotEight.currentPosition.getNumberString());
    knotEight.name='KnotEight';
    knotEight.isTail = false;

    let theTail:RopeEnd = new RopeEnd();
    theTail.currentPosition = new Square(0,0);
    theTail.visitedSquares = new Set();
    theTail.visitedSquares.add(theTail.currentPosition.getNumberString());
    theTail.name='TheTail';
    theTail.isTail = true;

    theHead.otherEnd = knotOne;
    knotOne.otherEnd = knotTwo;
    knotTwo.otherEnd = knotThree;
    knotThree.otherEnd = knotFour;
    knotFour.otherEnd = knotFive;
    knotFive.otherEnd = knotSix;
    knotSix.otherEnd = knotSeven;
    knotSeven.otherEnd = knotEight;
    knotEight.otherEnd = theTail;
    theMoves.forEach(function(move:string, index:number, theMoves:string[]){
        theHead.move(move);
    })
    //console.log(theHead.otherEnd.visitedSquares.size);
    console.log(theTail.visitedSquares.size);

    return 0;//console.log(theHead.otherEnd.visitedSquares.size);
}
class Square{
    x:number;
    y:number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }

    getNumberString():string{
        return (this.x.toString() + ":" + this.y.toString());
    }

}

class RopeEnd{

    visitedSquares:Set<string>;
    currentPosition:Square;
    otherEnd:RopeEnd;
    isTail:boolean;
    name:string;

    move(someSteps:string):void{
        //if(this.isTail){
        //    console.log('IS TAIL');
        //}
        let direction: string = someSteps.substring(0,2);
        //console.log(direction);
        //console.log(parseInt(someSteps.substring(2)));


        for(let i = 0; i < parseInt(someSteps.substring(2)); i++){

            let prevPosition = new Square(this.currentPosition.x,this.currentPosition.y);


            switch (direction) {
                case 'U ':
                    this.currentPosition = new Square(prevPosition.x,prevPosition.y+1);
                    this.visitedSquares.add(this.currentPosition.getNumberString());
                    if(!this.isTail){
                        if(prevPosition.y > this.otherEnd.currentPosition.y){
                            if(prevPosition.x > this.otherEnd.currentPosition.x){
                                this.otherEnd.move('UR 1');
                                break;
                            }
                            if(prevPosition.x == this.otherEnd.currentPosition.x){
                                this.otherEnd.move('U 1');
                                break;
                            }
                            if(prevPosition.x < this.otherEnd.currentPosition.x){
                                this.otherEnd.move('UL 1');
                                break;
                            }
                        }
                    }

                    break;
                case 'D ':
                    this.currentPosition = new Square(prevPosition.x,prevPosition.y-1);
                    this.visitedSquares.add(this.currentPosition.getNumberString());
                    if(!this.isTail){
                        if(prevPosition.y < this.otherEnd.currentPosition.y){
                            if(this.currentPosition.x > this.otherEnd.currentPosition.x){
                                this.otherEnd.move('DR 1');
                                break;
                            }
                            if(prevPosition.x == this.otherEnd.currentPosition.x){
                                this.otherEnd.move('D 1');
                                break;
                            }
                            if(prevPosition.x < this.otherEnd.currentPosition.x){
                                this.otherEnd.move('DL 1');
                                break;
                            }
                        }
                    }
                    break;
                case 'L ':
                    this.currentPosition = new Square(prevPosition.x-1,prevPosition.y);
                    this.visitedSquares.add(this.currentPosition.getNumberString());
                    if(!this.isTail){
                        if(prevPosition.x < this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('UL 1');
                                break;
                            }
                            if(prevPosition.y == this.otherEnd.currentPosition.y){
                                this.otherEnd.move('L 1');
                                break;
                            }
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('DL 1');
                                break;
                            }
                        }
                    }
                    break;
                case 'R ':
                    this.currentPosition = new Square(prevPosition.x+1,prevPosition.y);
                    this.visitedSquares.add(this.currentPosition.getNumberString());
                    if(!this.isTail){
                        if(prevPosition.x > this.otherEnd.currentPosition.x){
                            if(this.currentPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('UR 1');
                                break;
                            }
                            if(prevPosition.y == this.otherEnd.currentPosition.y){
                                this.otherEnd.move('R 1');
                                break;
                            }
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('DR 1');
                                break;
                            }
                        }
                    }
                    break;
                case 'UR':
                    this.currentPosition = new Square(prevPosition.x+1,prevPosition.y+1);
                    this.visitedSquares.add(this.currentPosition.getNumberString());
                    if(!this.isTail){
                        if(prevPosition.x > this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('UR 1');
                                break;
                            }
                            if(prevPosition.y == this.otherEnd.currentPosition.y){
                                this.otherEnd.move('UR 1');
                                break;
                            }
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('R 1');
                                break;
                            }
                        }
                        if(prevPosition.x == this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('UR 1');
                                break;
                            }
                        }
                        if(prevPosition.x < this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('U 1');
                                break;
                            }
                        }
                    }
                    break;
                case 'UL':
                    this.currentPosition = new Square(prevPosition.x-1,prevPosition.y+1);
                    this.visitedSquares.add(this.currentPosition.getNumberString());
                    if(!this.isTail){
                        if(prevPosition.x < this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('UL 1');
                                break;
                            }
                            if(prevPosition.y == this.otherEnd.currentPosition.y){
                                this.otherEnd.move('UL 1');
                                break;
                            }
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('L 1');
                                break;
                            }
                        }
                        if(prevPosition.x == this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('UL 1');
                                break;
                            }
                        }
                        if(prevPosition.x > this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('U 1');
                                break;
                            }
                        }
                    }
                    break
                case 'DR':
                    this.currentPosition = new Square(prevPosition.x+1,prevPosition.y-1);
                    this.visitedSquares.add(this.currentPosition.getNumberString());
                    if(!this.isTail){
                        if(prevPosition.x < this.otherEnd.currentPosition.x){
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('D 1');
                                break;
                            }
                        }
                        if(prevPosition.x == this.otherEnd.currentPosition.x){
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('DR 1');
                                break;
                            }
                        }
                        if(prevPosition.x > this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('R 1');
                                break;
                            }
                            if(prevPosition.y == this.otherEnd.currentPosition.y){
                                this.otherEnd.move('DR 1');
                                break;
                            }
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('DR 1');
                                break;
                            }
                        }
                    }
                    break;
                case 'DL':
                    this.currentPosition = new Square(prevPosition.x-1,prevPosition.y-1);
                    this.visitedSquares.add(this.currentPosition.getNumberString());
                    if(!this.isTail){
                        if(prevPosition.x < this.otherEnd.currentPosition.x){
                            if(prevPosition.y > this.otherEnd.currentPosition.y){
                                this.otherEnd.move('L 1');
                                break;
                            }
                            if(prevPosition.y == this.otherEnd.currentPosition.y){
                                this.otherEnd.move('DL 1');
                                break;
                            }
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('DL 1');
                                break;
                            }
                        }
                        if(prevPosition.x == this.otherEnd.currentPosition.x){
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('DL 1');
                                break;
                            }
                        }
                        if(prevPosition.x > this.otherEnd.currentPosition.x){
                            if(prevPosition.y < this.otherEnd.currentPosition.y){
                                this.otherEnd.move('D 1');
                                break;
                            }
                        }
                    }
                    break;
                default:
                    console.log('we shouldn\'t be here');
            }
            let logMessage = direction + ' from:' + prevPosition.getNumberString() + ' to ' +  this.currentPosition.getNumberString();
            //if(this.isTail){
            logMessage = logMessage + ' IS ' + this.name;
            //}
            console.log(logMessage);

        }
    }

}

