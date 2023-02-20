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
        // izvēlamies wrapper elementu kurā galabāsim ģenerāto HTML
        this.partWrapperElement = document.querySelector(partWrapperSelector)
        // šeit mēs glabāsim visas detaļas, lai varam piekļūt datiem
        // sākuma izveidojam vienu detaļu, lai rādās HTMLs
        this.allParts = [
            new DatoraDetala('RAM', 'Corsair Vengeance LPX 16GB', 99.99)
        ]

        // veidam init darbības
        this.init()
    }

    init() {
        // pirmajā reizē uz ielādi uzzīmējam HTML balstoties uz this.allParts
        this.addAllPartHtml()
        // pasaka ko darīt kad tiek pievienots jaus ieraksts
        this.addSubmitHandler()

        // pieliekam edit handlerus uz formām
        this.addEditHandlers()
    }

    tableRefresh() {
        this.addAllPartHtml()
        this.addEditHandlers()
    }

    addSubmitHandler() {
        // iedodam formas elementam eventa listeneri uz submit
        this.addFormElement.addEventListener('submit', (eventObject) => {
            // sakam lai uz submita lapa nepārlādējās
            eventObject.preventDefault()

            const formData = this.getFormData(this.addFormElement)

            const newPart = new DatoraDetala(
                formData.veids, 
                formData.modelis,
                formData.cena
            )

            // liek klāt pie visām detaļām
            this.allParts.push(newPart)
            // izveidojam un pieliek klāt jaunu rindu mūsu tabulā
            this.addAllPartHtml(newPart)

            // iztīram visas formas vērtības, lai pievienojot detaļu forma būtu tukša
            this.addFormElement.reset()
        })
    }

    addAllPartHtml(newPart) {
        // izveidojam mainīgo kurā glabāsim HTML
        let finalHTML = ""

        // ejam cauri katrai detaļai un katrai detaļai izveidojam savu HTML
        this.allParts.forEach((part) => {
            finalHTML += this.getPartHtmlCode(part)
    })

    // kad HTML ir gatavs, tad liekm iekšā mūsu wrapperī
    this.partWrapperElement.innerHTML = finalHTML
    }

    addEditHandlers() {
        // paņemam visas edit formas
        const allEditForms = this.partWrapperElement.querySelectorAll('.js-edit');

        // ejam cauri katrai un iedodam eventu
        allEditForms.forEach((form, index) => {
            form.addEventListener('submit', (eventObject) => {
                // sakam lai uz submita lapa nepārlādējās
                eventObject.preventDefault();

                // paņemam atjauninātos datus
                const updatedData = this.getFormData(form)

                // izlabojam detaļu kuru atradām pēc index ar jauniem datiem
                // NB detaļa ir klase un detaļai bija metode mainīt datus
                this.allParts[index].labotDetalu(updatedData.veids, updatedData.modelis, updatedData.cena)
                
                // pārzīmējam visu HTML
                this.tableRefresh()
            })
        })

    }

    // paņem un atgriež datus no formas
    getFormData(form) {
        const formData = new FormData(form);

        return {
            veids:  formData.get('veids'), 
            modelis: formData.get('modelis'), 
            cena: formData.get('cena')
        }
    }

    // abstrahējam prom HTML lai viņš mums netraucē
    getPartHtmlCode(part) {
        return `<form class="js-edit">
        <table class="table table-striped m-0">
            <tbody>
                <tr>
                <td valign="middle" style="width: 30%;">
                    <input 
                        type="text" 
                        name="veids" 
                        value="${part.veids}"
                        placeholder="RAM" 
                        class="form-control"
                        required
                    >
                </td>
                <td valign="middle" style="width: 30%;">
                    <input 
                        type="text" 
                        name="modelis" 
                        value="${part.modelis}"
                        class="form-control"
                        required
                        placeholder="Corsair Vengeance LPX 16GB" 
                    >
                </td>
                <td valign="middle" style="width: 30%;">
                    <input 
                        type="number" 
                        name="cena" 
                        value="${part.cena}"
                        class="form-control"
                        placeholder="99,99" 
                        required
                    >
                </td>
                <td valign="middle" style="width: 10%;">
                    <button type="submit" class="btn btn-dark btn-sm">
                        Labot
                    </button>
                </td>
                </tr>
            </tbody>
        </table>
    </form>`
    }
}

// inicializējam klasi
const datoruDetalasDarbibas = new DatoraDetalasFormas('.js-add-form', '.js-part-wrapper')