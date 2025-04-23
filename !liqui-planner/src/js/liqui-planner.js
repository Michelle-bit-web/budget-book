/**
 * Das Hauptmodul "liqui-planner" ist für die Instanziierung des Haushaltsbuchs
 * und den Start der Anwendung zuständig.
 */
import Balancebook from "../../classes/Balance-book.js";

/**
 * Instanziierung des Haushaltsbuchs und Start der Anwendung
 */
let liqui_planner = new Balancebook();
liqui_planner.start();

export default liqui_planner;