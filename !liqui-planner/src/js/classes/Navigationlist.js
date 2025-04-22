export default class Navigationlist{
    constructor(){
        this._html = this._generate_html();
    }
    _generate_html(){
        let nav = document.createElement("nav");
        nav.setAttribute("id", "navigationsleiste");
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        let span =document.createElement("span");
        span.setAttribute("id", "markenname");
        span.textContent = "Liqui-Planner";
        link.insertAdjacentElement("afterbegin", span);
        nav.insertAdjacentElement("afterbegin", link);

        return nav;
    }
    show(){
       let body = document.querySelector("body");
       if(body !== null){
        body.insertAdjacentElement("afterbegin", this._html);
       }
    }
}