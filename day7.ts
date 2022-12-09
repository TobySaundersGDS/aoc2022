import {fetchInput} from "./Fetcher";
const url = 'https://adventofcode.com/2022/day/7/input';
let totalSmall:number = 0;
let totalSize:number = 0;
let dirToDelete:number = 30000000;
let deleteMin:number =  70000000;

fetchInput(url).then((data) => {
    return (getDirsOver10000(data));
});

function getDirsOver10000(data: string):number{
    let theList:string[] = data.slice(7).split('\n');
    let theStart:DirListing = new DirListing('/', theList);

    const freeNeeded:number = 30000000;
    const totalDisk:number =  70000000;
    deleteMin = totalSize - (totalDisk - freeNeeded);
    theStart.getSubDirsTotalSize();
    console.log('totalSize: ' + totalSize)
    console.log('delete min: ' + deleteMin)
    console.log('dirToDelete: ' + dirToDelete);
    console.log('totalSmall: ' + totalSmall);
    return totalSmall;
}
class File{
    size:number;
    name:string;
}
class DirListing {

    childDirs:DirListing[];
    readonly dirName:string;
    dirFiles:File[];
    parentDir:DirListing;
    counter:number;

    constructor(dirName:string, list:string[], parentDir?:DirListing ){
        this.dirName = dirName;
        if(parentDir){
            this.parentDir = parentDir;
        }
        this.dirFiles = new Array();
        this.childDirs = new Array();
        if(list.length != 0){
            this.addListing(list);
        }
    }

    addListing(theList:string[]): void{

        theList.every(function(listItem:string ,listIndex:number ,theList:string[]){
            if(listItem.length >0){
                if(listItem.substring(0,4) == 'dir '){
                    let dontMakeDir:boolean = false;
                    this.childDirs.every(function(childDir, index, childDirs){
                        if(childDir.dirName == listItem.substring(5)){
                            dontMakeDir = true;
                        }
                    })
                    if(!dontMakeDir){
                        let blankArray = new Array();
                        let newDir = new DirListing(listItem.substring(4),blankArray,this);
                        this.childDirs.push(newDir);
                    }
                }else if(listItem.substring(0,7) == '$ cd ..'){
                    this.getParent().addListing(theList.slice(listIndex+1));
                    return false;
                }else if(listItem.substring(0,5) == '$ cd '){
                    this.childDirs.every(function(childDir, index, childDirs){
                        if(childDir.dirName == listItem.substring(5)){
                            childDir.addListing(theList.slice(listIndex+1));
                            return false;
                        }
                        return  true;
                     }, this);
                     return false;
                }else if(listItem.substring(0,4) == '$ ls'){
                }else if(listItem !== '' ){
                    let file:File = new File();
                    let fsize=parseInt(listItem.substring(0,listItem.indexOf(' ')));
                    if (isNaN(fsize)) { console.log(listItem); fsize = 0; }
                    file.size=fsize;
                    file.name=listItem.substring(listItem.indexOf(' ')+1);
                    this.dirFiles.push(file);
                    totalSize = totalSize+file.size;
                }
            }
            return true;
        }, this);

    }
    getParent():DirListing{
        return this.parentDir;
    }
    getFilesTotalSize():number{
        let filesSize:number = 0;
        this.dirFiles.forEach(function(dirFile, index, dirFiles){
            filesSize = filesSize + dirFile.size;
        });
        return filesSize;
    }

    getSubDirsTotalSize():number{
        let subsSize:number = 0;
        this.childDirs.forEach(function(fileDir, index, childDirs){
            subsSize = subsSize + fileDir.getSubDirsTotalSize();

        })
        let theseFiles:number=this.getFilesTotalSize();
        subsSize = subsSize+theseFiles;
        if( subsSize <= 100000){
            totalSmall = totalSmall + subsSize;
        }
        if(subsSize < dirToDelete && subsSize > deleteMin){
            dirToDelete = subsSize;
        }
        return subsSize;
    }
}