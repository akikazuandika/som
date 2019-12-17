//Masukkan data jarak, tiket, favorit
//Learning rate = random 0 - 1
//bobot awal = random

let jarak = [72, 67, 62, 21, 24, 31, 13, 74, 70, 26]
let tiket = [6, 15, 10, 1, 15, 30, 50, 5, 10, 3]
let favorit = [10, 10, 6, 7, 23, 39, 11, 10, 11, 11]
let tourismPlace = ["Pantai Tiga Warna", "Pantai Balekambang", "Pantai Ngliyep", "Sumber Sira", "Coban Rondo", "Bromo Semeru", "Hawai Waterpark", "Pantai Lenggoksono", "Pantai Goa Cina", "Sumber Maron"]

let learningRate = [0.6, 0.3, 0.15, 0.075, 0.0375]

let resultJarak = []
let resultTiket = []
let resultFavorit = []
let resultMaxEpochJarak = []
let resultMaxEpochTiket = []
let resultMaxEpochFavorit = []

for (let a = 0; a < learningRate.length; a++) {
    resultJarak.push(calculateMinimum(jarak, a))
    resultTiket.push(calculateMinimum(tiket, a))
    resultFavorit.push(calculateMinimum(favorit, a))
}

function calculateMinimum(data = [], a = 0) {
    let d1 = []
    let d2 = []
    let result = {}
    let bobot = [0.1, 0.3] //Bobot random
    for (let i = 0; i < data.length; i++) {
        let d1Temp = Math.pow( (data[i] - bobot[0]), 2 )
        let d2Temp = Math.pow( (data[i] - bobot[1]), 2 )
        d1.push(d1Temp)
        d2.push(d2Temp)
        let newBobot = 0
        d1Temp < d2Temp ? newBobot = bobot[0] + learningRate[a] * (data[i] - bobot[0]) : newBobot = bobot[1] + learningRate[a] * (data[i] - bobot[1])
        d1Temp < d2Temp ? bobot[0] = newBobot  : bobot[1] = newBobot
    }
    result.d1 = d1
    result.d2 = d2
    result.max = bobot
    return result
}

function calculateMaxEpoh(data = [], bobot = []) {
    let result = []
    for (let i = 0; i < data.length; i++) { 
        let d1Temp = Math.pow( (data[i] - bobot[0]), 2 )
        let d2Temp = Math.pow( (data[i] - bobot[1]), 2 )
        d1Temp < d2Temp ? result.push(d1Temp) : result.push(d2Temp)
    }
    
    return result
}

resultMaxEpochJarak = calculateMaxEpoh(jarak, resultJarak[resultJarak.length - 1].max)
resultMaxEpochTiket = calculateMaxEpoh(tiket, resultTiket[resultTiket.length - 1].max)
resultMaxEpochFavorit = calculateMaxEpoh(favorit, resultFavorit[resultFavorit.length - 1].max)

let result = []
for (let i = 0; i < 10; i++) {
    let data = {}
    let res = 0
    data.name = tourismPlace[i]
    data.jarak = resultMaxEpochJarak[i]
    data.tiket = resultMaxEpochTiket[i]
    data.favorit = resultMaxEpochFavorit[i]
    res = ( resultMaxEpochJarak[i] + resultMaxEpochTiket[i] + resultMaxEpochFavorit[i] ) / 3
    data.result = res
    result.push(data)
}

result = result.sort((a, b) => {
    return a.result - b.result
})

console.log(result);