/**
 * Moveable panes within a page
 * @file
 * @author scoutchorton
 */

/**
 * Pane class
 * @class
 */
class Pane {
    /**
     * New window on screen
     */
    constructor(id) {
        let paneTmpl = document.querySelector(`template[pane-template-id=${id}]`)
        if(paneTmpl)
            this.pane = paneTmpl.content.cloneNode(true);
        else
            throw `Unable to find Pane with the id ${id}.`
        console.log(this.pane)
    }
}