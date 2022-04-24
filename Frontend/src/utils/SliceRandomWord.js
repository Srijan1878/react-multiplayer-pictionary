const generateRandomIndex = (length) => {
    return Math.floor(Math.random() * length)
}

const sliceRandomWord = (word) => {
    if (word.length <= 3) {
        return ''.padStart(word.length, '_')
    }
    let randomIndexesArr = new Array(Math.floor(word.length / 3))
    for (let i = 0; i < randomIndexesArr.length; i++) {
        let randomIndex = generateRandomIndex(word.length)
        if(randomIndexesArr.includes(randomIndex)){
            i--
            continue
        }
        else randomIndexesArr[i] = generateRandomIndex(word.length)
    }
    randomIndexesArr.sort((a,b)=>a-b)
    let encryptedWord = ''
    for (let j = 0; j < word.length; j++) {
        let randomIndex = randomIndexesArr[0]
        if (j !== randomIndex){
            encryptedWord += '_'
            continue
        }
        encryptedWord += word[j]
        randomIndexesArr.shift()
    }
    return encryptedWord
}

export default sliceRandomWord