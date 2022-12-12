import {fetchInput} from "./Fetcher";
const url = 'https://adventofcode.com/2022/day/8/input';

fetchInput(url).then((data) => {
    return (getVisibleTrees(data.trim()));
});

function getVisibleTrees(forest:string):number{
    let eastToWestStrips:string[] = forest.split('\n');
    let eastToWestTrees:Tree[][] = eastToWestStrips.map(makeTrees, 'eastToWest');
    eastToWestTrees.forEach(trees => trees.forEach(tree=>console.log(tree.toString())));
    //console.log(eastToWestTrees);
    let northToSouthTrees:Tree[][] = flipTrees(eastToWestTrees);
    let visible:Set<Tree> = new Set();
    visible = getVisible(eastToWestTrees, visible);
    visible = getVisible(northToSouthTrees, visible);
    let visibleCount:number = 0;
    visible.forEach(function(tree, index, visible){
        if(tree.visible){
            visibleCount = visibleCount + 1;
        }
    });
    console.log(visibleCount);
    getScenic(eastToWestTrees, 'EastToWest');
    getScenic(northToSouthTrees, 'NorthToSouth');
    let treesScenicScored = eastToWestTrees.map(function(theseTrees, index1, eastToWest){
        theseTrees.forEach(function(thisTree,index2,theseTrees){
            thisTree.visibleNorth = this[index2][index1].visibleNorth;
            thisTree.visibleSouth = this[index2][index1].visibleSouth;

        },this);
        return theseTrees;
    },northToSouthTrees);
    console.log(treesScenicScored);
    let scenicScore:number = 0;
    treesScenicScored.forEach(function(theseTrees, index, scenics){
        theseTrees.forEach(function(tree,index,theseTrees){
            if(tree.scenicScore() > scenicScore){
                scenicScore = tree.scenicScore();
            }
        });
        //}
    });
    console.log(scenicScore);

    return visibleCount;
}
function makeTrees(stripOfTrees: string, latLong:number, strips:string[]):Tree[]{
    let trees:Tree[] = new Array()
    let arrayOfTrees = stripOfTrees.split('');
    arrayOfTrees.forEach(function(item,index,arrayOfTrees){
        let thisTree = new Tree;
        thisTree.height = parseInt(item);
        if(this == 'eastToWest'){
            thisTree.latitude = latLong;
            thisTree.longitude = index;
        }else if(this == 'northToSouth') {
            thisTree.latitude = index;
            thisTree.longitude = latLong;
        }
        trees.push(thisTree);
    }, this);
    return trees;
}
function flipTrees(lineOfTrees:Tree[][]):Tree[][]{
    const flipped = new Array(lineOfTrees.length);
    for (let i = 0; i < lineOfTrees.length; ++i) {
        flipped[i] = new Array(lineOfTrees[0].length);
      }
      for (let i = 0; i < lineOfTrees.length; ++i) {
        for (let j = 0; j < lineOfTrees[0].length; ++j) {
          flipped[j][i] = lineOfTrees[i][j];
        }
      }
      return flipped;
}
function getVisible(arrayOfTrees:Tree[][], visible:Set<Tree>):Set<Tree>{
    arrayOfTrees.forEach(function(theseTrees, index, arrayOfTrees){
        let highest:number = -1;
        theseTrees.forEach(function(thisTree,index,theseTrees){
            if(thisTree.height > highest){
                highest = thisTree.height;
                thisTree.visible =  true;
                this.add(thisTree);
            }
        },this);
        highest = -1;
        theseTrees.reverse().forEach(function(thisTree,index,theseTrees){
             if(thisTree.height > highest){
                 highest = thisTree.height
                 thisTree.visible =  true;
                 this.add(thisTree);
             }
         },this);
    }, visible);
    return visible;
}
function getScenic(arrayOfTrees:Tree[][],direction:string):void{
    arrayOfTrees.forEach(function(theseTrees, index, arrayOfTrees){
        let treesBefore:number = 0;
        theseTrees.forEach(function(thisTree,index,theseTrees){
            for(let i:number = 1; i <= index; i++ ){
                if(index>0){
                    if(theseTrees[index - i].height <= thisTree.height){
                        treesBefore = treesBefore + 1;
                    }
                    if(theseTrees[index - i].height >= thisTree.height){
                        break;
                    }
                }
            }
            if(direction == 'NorthToSouth'){
                thisTree.visibleNorth = treesBefore;
                treesBefore = 0;
            }else if(direction == 'EastToWest'){
                thisTree.visibleWest = treesBefore;
                treesBefore = 0;
            }


        });
        theseTrees.reverse().forEach(function(thisTree,index,theseTrees){
             for(let i:number = 1; i <= index; i++ ){
                if(index>0){
                    if(theseTrees[index - i].height <= thisTree.height){
                        treesBefore = treesBefore + 1;
                    }
                    if(theseTrees[index - i].height >= thisTree.height){
                        break;
                    }
                }
             }
             if(direction == 'NorthToSouth'){
                 thisTree.visibleSouth = treesBefore;
                 treesBefore = 0;
             }else if(direction == 'EastToWest'){
                 thisTree.visibleEast = treesBefore;
                 treesBefore = 0;
             }
         });
    });
}
class Tree{
    height:number;
    latitude:number;
    longitude:number
    visible:boolean;
    visibleEast: number;
    visibleWest: number;
    visibleSouth: number;
    visibleNorth: number;
    toString():string{
        return 'Lat,long,vis,height: ' + this.latitude + ',' + this.longitude + ','+ this.visible + ',' + this.height;
    };
    scenicScore():number{
        return this.visibleEast * this.visibleWest * this.visibleNorth * this.visibleSouth;
    }
}