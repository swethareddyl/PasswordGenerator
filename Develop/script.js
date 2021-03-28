// Assignment Code
var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
   //choose the length of the password
   var userChoice = window.prompt("Choose the length of the password between 8 and 128:");
   if (!userChoice){
     return;
   }
   const length = +userChoice;
   console.log(length);
 
   if (length < 8 || length > 128){
     window.prompt("Length of the password should be at least 8 characters and no more than 128 character");  
     return;
   }
   
   //Array of options for character type to pick from
   var options = ["lowercase", "uppercase", "numeric", "special characters"];
 
   //iterate through options, prompts the user and collect the user input to a variable
   for(var i=0; i < options.length; i++){
     var charChoice = window.prompt("Do you want to include: "  + options[i] + "?" + " Enter Yes or No!");
     console.log(charChoice);
     //convert the user selected value to upper case to be easy for comparision 
       if (charChoice != null) { 
       if (options[i] =="lowercase") {
         var lCase = charChoice.toUpperCase(); 
       } else if (options[i] =="uppercase"){
         var uCase = charChoice.toUpperCase(); 
       } else if (options[i] =="numeric"){
         var num = charChoice.toUpperCase();
       } else if (options[i] =="special characters"){
         var sChar = charChoice.toUpperCase();
       }
       }  
   }
  
 
   //Validate if atlease one of the char type is selected. If not prompt to select and end
   if ((lCase === "NO" || lCase == null) && (uCase === "NO" || uCase == null) && (num === "NO" || num == null)  && (sChar === "NO" || sChar == null )){
     window.alert("Atleast one character type should be selected");
     return;
   }
 
   //Calling generatePassword function and assigning the return value to the text area
   var password = generatePassword(lCase, uCase, num, sChar, length);
   var passwordText = document.querySelector("#password");
 
   passwordText.value = password;
 
   //generate password function
   function generatePassword(lower, upper, number, symbol, length){
     //initialize password variable
     let generatedPassword = '';
     const typesArr = [{lower}, {upper}, {number}, {symbol}]
 
     //Get the count of the selected chat types
     const typesArrFinal = [lower, upper, number, symbol]
     var selectedCount = 0;
     for(let i=0; i<typesArrFinal.length; i++){
       if (typesArrFinal[i] == "YES") {
         selectedCount = selectedCount + 1;
       }
       else{
         selectedCount = selectedCount;
       }
     }
 
     //call password generator function based on the selected char type
     for(let i=0; i<length-1; i+= selectedCount){
       typesArr.forEach(type => {
         const funcName = Object.keys(type)[0];
         const funcValue = Object.values(type)[0];
         //filter out unchecked types
         if (funcValue == "YES"){
           generatedPassword += randomFunc[funcName]();
         }
       });
     } 
     console.log('generatedPassword: ', generatedPassword);
     return generatedPassword;
   }
 }
 
 //Function To generate the random password based on the user selected char type 
 const randomFunc = {
   lower: getRandomLower, 
   upper: getRandomUpper, 
   number: getRandomNumber, 
   symbol: getRandomSymbol
 }
 
 //generator function - http://www.net-comber.com/charset.html
 function getRandomLower(){
   return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
 }
 
 function getRandomUpper(){
   return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
 }
 
 function getRandomNumber(){
   return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
 }
 
 function getRandomSymbol(){
  const symbols = '!#$%&()*+,-./:;<=>?@[\]^_`{|}~';
  return symbols[Math.floor(Math.random() * symbols.length)]
} 