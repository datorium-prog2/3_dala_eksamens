class DatoraDetala {
    constructor(veids, modelis, cena) {
        // validējam vai ir dati, ja nav dati tad metam erroru un tālāk nekas neizpildās
        this.validetDetalasDatus(veids, modelis, cena)

        // izveidojam jaunu detaļu
        this.veids = veids
        this.modelis = modelis
        this.cena = cena
    }

    apskatitDetalu() {
        // iegūstam detaļu
        return {
            veids: this.veids,
            modelis: this.modelis,
            cena: this.cena,
        }
    }

    labotDetalu (veids, modelis, cena) {
        // validējam vai ir dati, ja nav dati tad metam erroru un tālāk nekas neizpildās
        this.validetDetalasDatus(veids, modelis, cena)

        // pārrakstām esošās detaļu vērtības
        this.veids = veids
        this.modelis = modelis
        this.cena = cena
    }

    // datu validācijs metode
    validetDetalasDatus (veids, modelis, cena) {
        if (!veids || !modelis || cena === undefined) {
            throw Error('Nav padota visa nepieciešamā informācija!')
        }
    }

}

// šādi tiek veidota jauna detaļa OOP pierakstā, kur mēs no klases izveidojam detaļas instanci
const detala = new DatoraDetala('RAM', 'Corsair Vengeance LPX 16GB', 99.99)

// Klase, kas atbild par to, lai forma strādātu kā vēlamies
class DatoraDetalasFormas {
    constructor(addFormSelector) {
        // izvēlamies formas elementu
        this.addFormElement = document.querySelector(addFormSelector)

        // iedodam formas elementam eventa listeneri uz submit
        this.addFormElement.addEventListener('submit', (eventObject) => {
            // sakam lai uz submita lapa nepārlādējās
            eventObject.preventDefault()
            // iegūstam objektu, kurā ir pieejama indormācija par formas inputu vērtībām
            const formData = new FormData(this.addFormElement);

            // šādi var iegūt vērtības, kur veids === input name
            console.log(formData.get('veids'))
            console.log(formData.get('modelis'))
            console.log(formData.get('cena'))
        })
    }
}

// inicializējam klasi
const datoruDetalasDarbibas = new DatoraDetalasFormas('.js-add-form')