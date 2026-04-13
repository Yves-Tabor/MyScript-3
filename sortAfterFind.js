




// Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.
// a1 = ["arp", "live", "strong"]
// a2 = ["lively", "alive", "harp", "sharp", "armstrong"]
// returns ["arp", "live", "strong"]

function inArray(array1, array2){
    const results = [];

    for(let i = 0; i < array1.length; i++){
        const current = array1[i];

        for(let y = 0; y < array2.length; y++){ 
            if(array2[y].includes(current)){
                if(!results.includes(current)){
                    results.push(current);
                }
            }
        }
    }

    return results.sort();
}
console.log(inArray(["arp", "live", "strong"],["lively", "alive", "harp", "sharp", "armstrong"]));
