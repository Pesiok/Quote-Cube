class Modal {
    constructor() {
        this.modal = document.getElementById("modal");
        this.modalBtn = document.getElementById("modalBtn");

        this.events();
    }
    events() {
        document.addEventListener("DOMContentLoaded", () => {
            this.modalBtn.addEventListener("click", this.disableModal.bind(this));
            console.log(this.modal);
        });
    }

    disableModal() {
        this.modal.classList.add("modal--start");
        setTimeout(() => this.modal.classList.add("modal--disable"), 501);
        this.modalBtn.classList.add("modal__btn--active");
    }
}

export default Modal;