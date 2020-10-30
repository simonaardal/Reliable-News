// @flow
import axios from 'axios';

var ipadresse: string = "192.168.2.148";


export class Sak{
    id: number;
    navn: string;
    tittel: string;
    tekst: string;
    prioritering: string;
    kategori: string;
    url: string;
    tidspunkt: string;

    constructor(navn: string, tittel: string, tekst: string, prioritering: string, kategori: string, url: string, tidspunkt:string){
        this.navn = navn;
        this.tittel = tittel;
        this.tekst = tekst;
        this.kategori = kategori;
        this.prioritering = prioritering;
        this.url = url;
        this.tidspunkt = tidspunkt;
    }
}

export class Kommentar{
    kommentar: string;
    navn: string;
    pub_tidspunkt: string;

    constructor(kommentar: string, navn: string, pub_tidspunkt: string){
        this.kommentar = kommentar;
        this.navn = navn;
        this.pub_tidspunkt = pub_tidspunkt;
    }
}

class SakService{
    opprettSak(sak: Sak){
        return axios.post("http://" + ipadresse + ":3001/saker/", sak).then(response => response.data);
    }

    getPri2Saker(){
        return axios.get<Sak[]>("http://" + ipadresse + ":3001/saker/pri2").then(response => response.data);
    }

    getPri1Saker(){
        return axios.get<Sak[]>("http://" + ipadresse + ":3001/saker/pri1").then(response => response.data);
    }

    getKategori(kategori: string){
        return axios.get<Sak[]>("http://" + ipadresse + ":3001/kategori/"+kategori).then(response => response.data);
    }

    getSak(id: number){
        return axios.get<Sak[]>("http://" + ipadresse + ":3001/saker/" + id).then(response => response.data);
    }

    endreSak(sak: Sak, id: number){
        return axios.put<Sak, number>("http://" + ipadresse + ":3001/saker/" + id, sak).then(response => response.data);
    }

    slettSak(id: number){
        return axios.delete("http://" + ipadresse + ":3001/saker/" + id).then(response => response.data);
    }

    publiserKommentar(kommentar: Kommentar, id: number){
        return axios.post<void>("http://" + ipadresse + ":3001/kommentarer/" + id, kommentar).then(response => response.data);
    }

    getKommentarer(id: number){
        return axios.get<Kommentar>("http://" + ipadresse + ":3001/kommentarer/" + id).then(response => response.data);
    }

    like(id: number){
        return axios.put("http://" + ipadresse + ":3001/saker/likes/" + id).then(response => response.data);
    }

    getLikes(id: number){
        return axios.get<number>("http://" + ipadresse + ":3001/saker/likes/" + id).then(response => response.data);
    }

    dislike(id: number){
        return axios.put("http://" + ipadresse + ":3001/saker/dislikes/" + id).then(response => response.data);
    }

    getDislikes(id: number){
        return axios.get<number>("http://" + ipadresse + ":3001/saker/dislikes/" + id).then(response => response.data);
    }
}

export let sakService = new SakService();

