import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("StudentDB.db");

export default db;
