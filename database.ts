import * as SQLite from 'expo-sqlite';

const db =
SQLite.openDatabaseSync(
'showtracker.db'
);

export type EventType={

id:number;
title:string;
location:string;
latitude:number;
longitude:number;
date:string;

};

export type PhotoType={

id:number;
event_id:number;
image_uri:string;

};

export function initDatabase(){

db.execSync(`

CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT,

password TEXT

);

CREATE TABLE IF NOT EXISTS events(

id INTEGER PRIMARY KEY AUTOINCREMENT,

title TEXT,

location TEXT,

latitude REAL,

longitude REAL,

date TEXT

);

CREATE TABLE IF NOT EXISTS photos(

id INTEGER PRIMARY KEY AUTOINCREMENT,

event_id INTEGER,

image_uri TEXT

);

`);

}

export function createUser(

username:string,
password:string

){

db.runSync(

`
INSERT INTO users
(username,password)
VALUES (?,?)
`,

[
username,
password
]

);

}

export function loginUser(

username:string,
password:string

){

return db.getFirstSync(

`
SELECT *
FROM users
WHERE username=?
AND password=?
`,

[
username,
password
]

);

}

export function createEvent(

title:string,
location:string,
latitude:number,
longitude:number,
date:string

){

db.runSync(

`
INSERT INTO events
(title,location,latitude,longitude,date)
VALUES (?,?,?,?,?)
`,

[
title,
location,
latitude,
longitude,
date
]

);

}

export function getEvents(){

return db.getAllSync(

'SELECT * FROM events'

) as EventType[];

}

export function getEventById(
id:number
){

return db.getFirstSync(

'SELECT * FROM events WHERE id=?',

[id]

) as EventType|null;

}

export function updateEvent(

id:number,
title:string,
location:string,
latitude:number,
longitude:number,
date:string

){

db.runSync(

`
UPDATE events
SET

title=?,
location=?,
latitude=?,
longitude=?,
date=?

WHERE id=?
`,

[
title,
location,
latitude,
longitude,
date,
id
]

);

}

export function deleteEvent(
id:number
){

db.runSync(

'DELETE FROM events WHERE id=?',

[id]

);

}

export function savePhoto(

eventId:number,
uri:string

){

db.runSync(

`
INSERT INTO photos
(event_id,image_uri)
VALUES (?,?)
`,

[
eventId,
uri
]

);

}

export function getPhotos(
eventId:number
){

return db.getAllSync(

'SELECT * FROM photos WHERE event_id=?',

[eventId]

) as PhotoType[];

}

export function getTotalPhotos(){

const fotos=

db.getAllSync(
'SELECT * FROM photos'
);

return fotos.length;

}

function converterData(
dataTexto:string
){

const [data,hora]=
dataTexto.split(' ');

const [dia,mes,ano]=
data.split('/');

const [horas,minutos]=
hora.split(':');

return new Date(

Number(ano),

Number(mes)-1,

Number(dia),

Number(horas),

Number(minutos)

);

}

export function getPastEvents(){

const eventos=
getEvents();

const agora=
new Date();

return eventos.filter(

evento=>

converterData(
evento.date
)<agora

);

}

export function getActiveEvents(){

const eventos=
getEvents();

const agora=
new Date();

return eventos.filter(

evento=>

converterData(
evento.date
)>=agora

);

}

export function getNextEvent(){

const eventos=
getActiveEvents();

if(
eventos.length===0
){

return null;

}

eventos.sort(

(a,b)=>

converterData(
a.date
).getTime()

-

converterData(
b.date
).getTime()

);

return eventos[0];

}