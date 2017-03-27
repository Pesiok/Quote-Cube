class Modal {
    constructor() {
        this.modal = document.getElementById("modal");
        this.modalBtn = document.getElementById("modalBtn");
        this.generatorBtn = document.getElementById("generatorBtn");

        this.events();
    }
    events() {
        document.addEventListener("DOMContentLoaded", () => {
            this.modalBtn.addEventListener("click", this.turnOffModal.bind(this));
            this.generatorBtn.addEventListener("click", this.turnOnModal.bind(this));
            document.addEventListener("keydown", event => {
                if (event.keyCode === 27) {
                    //esc
                    this.turnOnModal();
                }  
             });
        });
    }

    turnOffModal() {
        this.modal.style.transform = "translateY(-100%)";
        setTimeout(() => this.modal.classList.add("modal--disable"), 501);
        this.modalBtn.classList.add("modal__btn--active");
    }
    turnOnModal() {
        this.modal.classList.remove("modal--disable");
        setTimeout(() => this.modal.style.transform = "translateY(0%)", 50);
        this.modalBtn.classList.remove("modal__btn--active");
    }

    
}

export default Modal;