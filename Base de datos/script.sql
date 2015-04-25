--
-- ER/Studio 8.0 SQL Code Generation
-- Company :      Eiji
-- Project :      ER.DM1
-- Author :       PC
--
-- Date Created : Friday, April 24, 2015 23:58:15
-- Target DBMS : PostgreSQL 8.0
--

-- 
-- TABLE: BUS 
--

CREATE TABLE BUS(
    bus         integer    NOT NULL,
    tipo_bus    integer    NOT NULL,
    CONSTRAINT PK2 PRIMARY KEY (bus)
)
;



-- 
-- TABLE: CLIENTE 
--

CREATE TABLE CLIENTE(
    cliente    integer          NOT NULL,
    nombre     varchar(60)      NOT NULL,
    saldo      numeric(8, 4)    NOT NULL,
    password   varchar(50)      NOT NULL,
    CONSTRAINT PK10 PRIMARY KEY (cliente)
)
;



-- 
-- TABLE: DEPARTAMENTO 
--

CREATE TABLE DEPARTAMENTO(
    departamento    integer        NOT NULL,
    nombre          varchar(30)    NOT NULL,
    CONSTRAINT PK5 PRIMARY KEY (departamento)
)
;



-- 
-- TABLE: ESTACION 
--

CREATE TABLE ESTACION(
    estacion     integer        NOT NULL,
    nombre       varchar(50),
    municipio    integer        NOT NULL,
    CONSTRAINT PK6 PRIMARY KEY (estacion)
)
;



-- 
-- TABLE: MUNICIPIO 
--

CREATE TABLE MUNICIPIO(
    municipio       integer        NOT NULL,
    nombre          varchar(50)    NOT NULL,
    departamento    integer        NOT NULL,
    CONSTRAINT PK7 PRIMARY KEY (municipio)
)
;



-- 
-- TABLE: RUTA 
--

CREATE TABLE RUTA(
    ruta      integer        NOT NULL,
    nombre    varchar(30),
    CONSTRAINT PK4 PRIMARY KEY (ruta)
)
;



-- 
-- TABLE: RUTA_BUS 
--

CREATE TABLE RUTA_BUS(
    ruta_bus    serial    NOT NULL,
    bus         integer,
    ruta        integer,
    CONSTRAINT PK11 PRIMARY KEY (ruta_bus)
)
;



-- 
-- TABLE: RUTA_ESTACION 
--

CREATE TABLE RUTA_ESTACION(
    numero_estacion             integer    NOT NULL,
    ruta_estacion               serial    NOT NULL,
    distancia_punto_anterior    integer    NOT NULL,
    ruta                        integer    NOT NULL,
    estacion                    integer    NOT NULL,
    CONSTRAINT PK9 PRIMARY KEY (ruta_estacion)
)
;



-- 
-- TABLE: TICKET 
--

CREATE TABLE TICKET(
    ticket               integer          NOT NULL,
    hora_salida          time             NOT NULL,
    hora_llegada         time             NOT NULL,
    precio               numeric(8, 4)    NOT NULL,
    numero_kilometros    integer          NOT NULL,
    numero_asiento       integer          NOT NULL,
    cancelado            boolean          NOT NULL,
    cliente              integer          NOT NULL,
    origen               integer          NOT NULL,
    destino              integer          NOT NULL,
    CONSTRAINT PK8 PRIMARY KEY (ticket)
)
;



-- 
-- TABLE: TIPO_BUS 
--

CREATE TABLE TIPO_BUS(
    tipo_bus     integer        NOT NULL,
    nombre       varchar(15)    NOT NULL,
    capacidad    integer        NOT NULL,
    CONSTRAINT PK1 PRIMARY KEY (tipo_bus)
)
;



-- 
-- TABLE: BUS 
--

ALTER TABLE BUS ADD CONSTRAINT RefTIPO_BUS1 
    FOREIGN KEY (tipo_bus)
    REFERENCES TIPO_BUS(tipo_bus)
;


-- 
-- TABLE: ESTACION 
--

ALTER TABLE ESTACION ADD CONSTRAINT RefMUNICIPIO4 
    FOREIGN KEY (municipio)
    REFERENCES MUNICIPIO(municipio)
;


-- 
-- TABLE: MUNICIPIO 
--

ALTER TABLE MUNICIPIO ADD CONSTRAINT RefDEPARTAMENTO9 
    FOREIGN KEY (departamento)
    REFERENCES DEPARTAMENTO(departamento)
;


-- 
-- TABLE: RUTA_BUS 
--

ALTER TABLE RUTA_BUS ADD CONSTRAINT RefBUS17 
    FOREIGN KEY (bus)
    REFERENCES BUS(bus)
;

ALTER TABLE RUTA_BUS ADD CONSTRAINT RefRUTA18 
    FOREIGN KEY (ruta)
    REFERENCES RUTA(ruta)
;


-- 
-- TABLE: RUTA_ESTACION 
--

ALTER TABLE RUTA_ESTACION ADD CONSTRAINT RefESTACION15 
    FOREIGN KEY (estacion)
    REFERENCES ESTACION(estacion)
;

ALTER TABLE RUTA_ESTACION ADD CONSTRAINT RefRUTA16 
    FOREIGN KEY (ruta)
    REFERENCES RUTA(ruta)
;


-- 
-- TABLE: TICKET 
--

ALTER TABLE TICKET ADD CONSTRAINT RefCLIENTE10 
    FOREIGN KEY (cliente)
    REFERENCES CLIENTE(cliente)
;

ALTER TABLE TICKET ADD CONSTRAINT RefRUTA_ESTACION13 
    FOREIGN KEY (origen)
    REFERENCES RUTA_ESTACION(ruta_estacion)
;

ALTER TABLE TICKET ADD CONSTRAINT RefRUTA_ESTACION14 
    FOREIGN KEY (destino)
    REFERENCES RUTA_ESTACION(ruta_estacion)
;


