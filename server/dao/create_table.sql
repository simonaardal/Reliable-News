DROP TABLE IF EXISTS kommentarer;
DROP TABLE IF EXISTS saker;

CREATE TABLE kommentarer(
  kommentarID int(11) NOT NULL,
  navn varchar(50) NOT NULL,
  kommentar varchar(200) NOT NULL,
  sak int(11) NOT NULL,
  pub_tidspunkt varchar(20),
  PRIMARY KEY (kommentarID)
);

CREATE TABLE saker (
    id int(11) NOT NULL,
    navn varchar(200) NOT NULL,
    tittel varchar(200) NOT NULL,
    tekst longtext NOT NULL,
    prioritering varchar(100) NOT NULL,
    kategori varchar(100) NOT NULL,
    url varchar(200),
    tidspunkt varchar(20),
    likes int(10),
    dislikes int(11)
);
