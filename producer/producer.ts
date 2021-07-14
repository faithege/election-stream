import * as yauzl from 'yauzl'
import { Entry } from 'yauzl';


const openZipfile = function(path:string, options: yauzl.Options){
    return new Promise <yauzl.ZipFile>(
        function (resolve, reject){
            yauzl.open(path, options, function(error, zipfile){
                if (error) {
                    reject(error)
                }
                else if(zipfile){
                    resolve(zipfile)
                }
            })
        }
    )
}


async function readEntries(zipfile:yauzl.ZipFile): Promise<Entry[]>{
    return new Promise<Entry[]>(
        function (resolve, reject){
            const dataArray: Entry[] = []
            zipfile.readEntry();
            
            zipfile.on("entry", function(entry:Entry) { // callback on entry event, item pushed and cursor moved to next entry - until end reached
                dataArray.push(entry)
                zipfile.readEntry();


            //   if (/\/$/.test(entry.fileName)) {
            //     // Directory file names end with '/'.
            //     // Note that entries for directories themselves are optional.
            //     // An entry's fileName implicitly requires its parent directories to exist.
            //     zipfile.readEntry();
            //   } else {
            //     // file entry
            //     zipfile.openReadStream(entry, function(err, readStream) {
            //       if (err) throw err;
            //       readStream.on("end", function() {
            //         zipfile.readEntry();
            //       });
            //       readStream.pipe(somewhere);
            //     });
            //   }
            });
            zipfile.on("end", () => {
                resolve(dataArray)
                console.log("end of entries");
            });
        }
    )
    
}

function compareEntriesByTime(a: Entry,b: Entry): number{
    return a.getLastModDate().getTime() - b.getLastModDate().getTime()
}

async function processZipfile(){
    const zipfile = await openZipfile("./data/2019-12-05-test-general-election-full.zip", {lazyEntries: true})
    const entries = await readEntries(zipfile)
    const sortedEntries = entries.sort(compareEntriesByTime)
    //console.log(sortedEntries.map(item => item.getLastModDate()).join('\n'))
    console.log(typeof sortedEntries[0])
    //how extract data blob?
    //use sorted entries to push data to stream using .putRecord
}


// Top level async function allows us to run the file, but also catch any errors, this way it will never reject (vs if we called the processZipfile() directly)
(async () => {
    try {
        await processZipfile()
    } catch (e) {
        // Deal with the fact the chain failed
    }
})();



