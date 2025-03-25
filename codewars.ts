export function toCamelCase(str:string):string{
    if (str != ""){
      const words = str.split(/[-_]/);
      console.log(words);
      if (words.length > 1){
        for (let i = 1; i < words.length; i++){
          words[i][0].toUpperCase();
        }
      }
      console.log(words);
      return "";
    }
    return "";
  }

toCamelCase("the_stealth_warrior");