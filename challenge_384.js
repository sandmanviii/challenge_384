const fetch = require('node-fetch')
const fs = require('fs')

morseCode = fs.readFileSync("morseCode.txt").toString().split(',')
wordList = fs.readFileSync("wordList.txt").toString().split(',')

//Initial Challenge
function smorse(msg){

    morse_code_alphabet = '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --..'
    parsed_morse = morse_code_alphabet.split(' ')

    alphabet = "abcdefghijklmnopqrstuvwxyz"
    temp_obj = {}
    morse_str = ''

    for(l in msg){
    if(msg.length != null){
        for(letter in alphabet){
            if(msg[l] === alphabet[letter]){
                morse_str += parsed_morse[letter]
                break
            }
        }
    }
}

return morse_str

}
//Used to create text files with words and morse codes
async function temp(){
    wordList = await fetch("https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt").then(r=>r.text())
    parsed_wordList = wordList.split('\n')
    fs.writeFile('wordList.txt', parsed_wordList, (err)=> {
        if(err) throw err
    })
}
//Used to create morse code file
function createMorseCode(){
    morse_code_alphabet = '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --..'
    parsed_morse = morse_code_alphabet.split(' ')
    for(word in wordList){
        morse = smorse(wordList[word])
        fs.appendFile('morseCode.txt', morse + ',', (err)=> {
            if(err) throw err
        }) 

    }
}

//Bonus Challenge 1
//The sequence -...-....-.--. is the code for four different words (needing, nervate, niding, tiling). 
//Find the only sequence that's the code for 13 different words.
function bonus1() { 
    count = {}
    highestCounter = 0
    for(i=0; i < morseCode.length; i++){
        currentCounter = 0
        for (j=0; j < morseCode.length; j++){
            if(morseCode[i] === morseCode[j]){
            currentCounter++
            }
        }
        if(currentCounter > highestCounter){
            highestCounter = currentCounter
            console.log(highestCounter)
        }
    }

    highest = 0
    repeated = ''

    for(prop in count) {
        if(count[prop] > highest) {
            highest = count[prop];
            repeated = prop.toString()
            console.log("Repeated:" + repeated + "Highest Count: " + highest)
        }
    }
    repeatArray = []

    for(i=0; i < morseCode.length; i++){
        if(repeated === morseCode[i]){
            repeatArray.push(wordList[i])
        }
    }
    console.log(repeated + ' is repeated ' + highest + ' times.')
    console.log('Words: ' + repeatArray.join(', '))
}

//Bonus Challenge 2
// Autotomous encodes to .-..--------------..-..., which has 14 dashes in a row. 
// Find the only word that has 15 dashes in a row.
function bonus2(){  
    for(word in wordList) {
        morse = smorse(wordList[word])
        if(/-{15}/.test(morse)){
            console.log(morse + ' is ' + wordList[word])
            break
        }
    }
}

string = 'needing'
new_str = smorse(string)
bonus1()
bonus2()
