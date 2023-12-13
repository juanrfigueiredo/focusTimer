import * as phosphor from "./js/phosphor-icons.js";
import * as sounds from "./js/sounds.js";
import * as timer from "./js/timer.js";


phosphor.getIcons();
sounds.registerEvents();

timer.initializeTimer(25,0);
timer.registerControlEvents();