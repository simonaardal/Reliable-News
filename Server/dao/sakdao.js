// @flow
import type {Kommentar, Sak} from "../src";

const Dao = require("./dao.js");

module.exports = class SakDao extends Dao {

    opprettSak(json: Sak, callback: Function){
        var val = [json.navn, json.tittel, json.tekst, json.prioritering, json.kategori, json.url, json.tidspunkt];
        super.query("INSERT INTO saker (navn, tittel, tekst, prioritering, kategori, url, tidspunkt) values (?,?,?,?,?,?,?)", val, callback);
    }

    getSakerMedPri2(callback: Function){
        super.query("SELECT * FROM saker where prioritering = 'prioritering2' order by ID desc limit 10",[], callback);
    }

    getSakerMedPri1(callback: Function){
        super.query("SELECT * FROM saker WHERE prioritering = 'prioritering1' ORDER BY (likes+dislikes) desc limit 20",[], callback);
    }

    getKategori(kategori: string, callback: Function){
        super.query("SELECT * FROM saker WHERE kategori = ?", [kategori],callback);
    }

    getSak(id: number, callback: Function){
        super.query("SELECT * FROM saker WHERE id=?", [id], callback);
    }

    endreSak(id: number, json: Sak, callback: Function){
        var val = [json.navn, json.tittel, json.tekst, json.prioritering, json.kategori, json.url];
        super.query("UPDATE saker SET navn=?, tittel=?, tekst=?, prioritering=?, kategori=?, url=? WHERE id=?", [val[0], val[1], val[2], val[3], val[4], val[5], id], callback);
    }

    slettSak(id: number, callback: Function){
        super.query("DELETE FROM saker where id=?", [id], callback);
    }

    publiserKommentar(id: number, json: Kommentar, callback: Function){
        var val = [json.navn, json.kommentar, json.pub_tidspunkt];
        super.query("INSERT INTO kommentarer (navn, kommentar, sak, pub_tidspunkt) values (?,?,?,?)", [val[0], val[1], id, val[2]], callback);
    }

    getKommentarer(id: number, callback: Function){
        super.query("SELECT * FROM kommentarer WHERE sak=?", [id], callback);
    }
    like(id: number, callback: Function){
        super.query("UPDATE saker SET likes = likes + 1 where id=?", [id], callback);
    }
    dislike(id: number, callback: Function){
        super.query("UPDATE saker SET dislikes = dislikes - 1 where id=?", [id], callback);
    }

    getLikes(id: number, callback: Function){
        super.query("SELECT likes FROM saker where id=?", [id], callback);
    }

    getDislikes(id: number, callback: Function){
        super.query("SELECT dislikes FROM saker where id=?", [id], callback);
    }
};