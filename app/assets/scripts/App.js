import "babel-polyfill";
import particlesConfig from "./config/particles";
import Modal from "./modules/Modal";
import Cube from "./modules/Cube";

const cube = new Cube();
const modal = new Modal();

document.addEventListener("DOMContentLoaded", function(){
    Particles.init(particlesConfig);
})

