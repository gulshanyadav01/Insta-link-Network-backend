let str1 = "ghijk"; 
let str2 = "ghijklm"; 

const check = (str1, str2) => {
    for(var i = 0; i< str2.length && i< str1.length ; i++){
        if(str1[i] != str2[i]) return false; 
    
    }
    return true;     

}
console.log(check(str1, str2)); 


