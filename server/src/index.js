// @flow
import {type $Application, type $Request, type $Response} from 'express';

var express = require("express");
var mysql = require("mysql");
var app: $Application = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for å tolke JSON
const SakDao = require("../dao/sakdao.js");


export type Sak = {
    id: number,
    navn: string,
    tittel: string,
    tekst: string,
    prioritering: string,
    kategori: string,
    url: string,
    tidspunkt: string,
    likes: number,
    dislikes: number
}

export type Kommentar = {
    kommentar: string;
    navn: string;
    pub_tidspunkt: string;
}

app.use(function(req: $Request, res: $Response, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql-ait.stud.idi.ntnu.no",
    user: "simoaa",
    password: "PKifDUxd",
    database: "simoaa",
    debug: false
});

let sakDao: SakDao = new SakDao(pool);


//LEGG TIL SAK I SAKER
app.post("/saker/", (req: {body: Sak}, res: $Response) => {
    console.log("saker/:id/kommentaer fikk request fra klient");
    sakDao.opprettSak(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

//HENT UT ALLE SAKER MED PRIORITERING 2
app.get("/saker/pri2", (req: $Request, res: $Response) => {
    console.log("/saker/:pri2 fikk request fra klient");
    sakDao.getSakerMedPri2((status, data) => {
        res.status(status);
        res.json(data);
    });
});

//HENT UT ALLE SAKER MED PRIORITERING 1
app.get("/saker/pri1", (req: $Request, res: $Response) => {
    console.log("/saker/pri1 fikk request fra klient");
    sakDao.getSakerMedPri1((status, data) => {
        res.status(status);
        res.json(data);
    });
});


//HENT UT EN SAK MED GITT ID
app.get("/saker/:sakID", (req: {params: {sakID: number}}, res: $Response) => {
    console.log("/saker/:sakID: fikk request fra klient");
    sakDao.getSak(req.params.sakID, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//HENTER UT SAKER MED GITT KATEGORI
app.get("/kategori/:kategori", (req: {params: {kategori: string}}, res: $Response) => {
    console.log("/:kategori: fikk request fra klient");
    sakDao.getKategori(req.params.kategori, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//ENDRE SAK MED GITT ID
app.put("/saker/:sakID", (req: {body: Sak, params: {sakID: number}}, res: $Response) => {
    console.log("/saker/:id: fikk request fra klient");
    sakDao.endreSak(req.params.sakID, req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

//SLETT SAK MED GITT ID
app.delete("/saker/:sakID", (req: {params: {sakID: number}}, res: $Response) => {
    console.log("saker/:id: fikk request fra klient");
    sakDao.slettSak(req.params.sakID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.post("/kommentarer/:sakID", (req: {body:Kommentar, params: {sakID: number}}, res: $Response) => {
    console.log("saker/:id/kommentaer fikk request fra klient");
    sakDao.publiserKommentar(req.params.sakID, req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/kommentarer/:id", (req: {params: {id: number}}, res: $Response) => {
    console.log("saker/:id/kommentaer fikk request fra klient");
    sakDao.getKommentarer(req.params.id,(status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.put("/saker/likes/:id", (req: {params: {id: number}}, res: $Response) => {
    console.log("rating/:id fujj reqyest fra klient");
    sakDao.like(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});


app.get("/saker/likes/:id", (req: {params: {id: number}}, res: $Response) => {
    console.log("rating/:id fikk reqyest fra klient");
    sakDao.getLikes(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.put("/saker/dislikes/:id", (req: {params: {id: number}}, res: $Response) => {
    console.log("rating/:id fikk reqyest fra klient");
    sakDao.dislike(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/saker/dislikes/:id", (req: {params: {id: number}}, res: $Response) => {
    console.log("rating/:id fikk reqyest fra klient");
    sakDao.getDislikes(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

var server = app.listen(3001);
