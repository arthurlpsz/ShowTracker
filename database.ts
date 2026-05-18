import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('showtracker.db');

export type EventType = {
  id: number;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  date: string;
};

export function initDatabase() {

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

  `);

}

export function createUser(
  username: string,
  password: string
) {

  db.runSync(
    'INSERT INTO users(username,password) VALUES (?,?)',
    [username, password]
  );

}

export function loginUser(
  username: string,
  password: string
) {

  return db.getFirstSync(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, password]
  );

}

export function createEvent(
  title: string,
  location: string,
  latitude: number,
  longitude: number,
  date: string
) {

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

export function getEvents(): EventType[] {

  return db.getAllSync(
    'SELECT * FROM events'
  ) as EventType[];

}

export function getEventById(
  id: number
): EventType | null {

  return db.getFirstSync(
    'SELECT * FROM events WHERE id=?',
    [id]
  ) as EventType | null;

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