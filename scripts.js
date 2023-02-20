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
    constructor(addFormSelector, partWrapperSelector) {
        // izvēlamies formas elementu
        this.addFormElement = document.querySelector(addFormSelector)
        this.partWrapperElement = document.querySelector(partWrapperSelector)
        this.allParts = []

        this.submitHandler()
    }

    submitHandler() {
        // iedodam formas elementam eventa listeneri uz submit
        this.addFormElement.addEventListener('submit', (eventObject) => {
            // sakam lai uz submita lapa nepārlādējās
            eventObject.preventDefault()
            // iegūstam objektu, kurā ir pieejama indormācija par formas inputu vērtībām
            const formData = new FormData(this.addFormElement);

            // izveidojam jaunu detaļas objektu
            const newPart = new DatoraDetala(
                formData.get('veids'), 
                formData.get('modelis'), 
                formData.get('cena')
            )

            // liek klāt pie visām detaļām
            this.allParts.push(newPart)
            // izveidojam un pieliek klāt jaunu rindu mūsu tabulā
            this.addPartHtml(newPart)

            // iztīram visas formas vērtības, lai pievienojot detaļu forma būtu tukša
            this.addFormElement.reset()
        })
    }

    addPartHtml(newPart) {
        this.partWrapperElement.innerHTML = 'Hello there'

        console.log('Šeit es veidošu HTML manai jaunajai detaļai')
    }
}

// inicializējam klasi
const datoruDetalasDarbibas = new DatoraDetalasFormas('.js-add-form', '.js-part-wrapper')