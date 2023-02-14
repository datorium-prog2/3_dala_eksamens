class DatoraDetala {
    constructor(veids, modelis, cena) {
        this.validetDetalasDatus(veids, modelis, cena)

        this.veids = veids
        this.modelis = modelis
        this.cena = cena
    }

    apskatitDetalu() {
        return {
            veids: this.veids,
            modelis: this.modelis,
            cena: this.cena,
        }
    }

    labotDetalu (veids, modelis, cena) {
        this.validetDetalasDatus(veids, modelis, cena)

        this.veids = veids
        this.modelis = modelis
        this.cena = cena
    }

    validetDetalasDatus (veids, modelis, cena) {
        if (!veids || !modelis || cena === undefined) {
            throw Error('Nav padota visa nepieciešamā informācija!')
        }
    }

}

const detala = new DatoraDetala('RAM', 'Corsair Vengeance LPX 16GB', 99.99)


class DatoraDetalasForma {
    constructor(addFormSelector) {
        this.addFormElement = document.querySelector(addFormSelector)

        this.addFormElement.addEventListener('submit', (eventObject) => {
            eventObject.preventDefault()

            const formData = new FormData(this.addFormElement);


            console.log(formData.get('veids'))
            console.log(formData.get('modelis'))
            console.log(formData.get('cena'))
        })
    }
}


const datoruDetalasDarbibas = new DatoraDetalasForma('.js-add-form')