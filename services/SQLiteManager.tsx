import * as SQLite from 'expo-sqlite/legacy';

class SQLiteManager {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabase('adventure.db');
  }

  // Cancella e ricrea la tabella adventures
  resetDatabase(): void {
    this.db.transaction((tx: any) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS adventures;`,
        [],
        () => {
          console.log("Table 'adventures' dropped successfully");
          this.init(); // Ricrea la tabella
        },
        (_: any, error: any) => {
          console.error('Error dropping table:', error);
          return true;
        }
      );
    });
  }

  // Inizializzazione della tabella adventures
  init(): void {
    this.db.transaction((tx: any) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS adventures (
          adventure_id TEXT,
          adventure_name TEXT,
          route_order INTEGER,
          question_id TEXT PRIMARY KEY NOT NULL,
          question TEXT,
          answer TEXT,
          latitude REAL,
          longitude REAL
        );`,
        [],
        () => console.log("Table 'adventures' created successfully"),
        (_: any, error: any) => {
          console.error('Error creating table:', error);
          return true;
        }
      );
    });
  }

  // Inserimento o aggiornamento di un'avventura
  upsertAdventure(
    adventure_id: string,
    adventure_name: string,
    route_order: number,
    question_id: string,
    question: string,
    answer: string,
    latitude: number,
    longitude: number
  ): void {
    this.db.transaction((tx: any) => {
      console.log('Inserting/updating adventure:', {
        adventure_id,
        adventure_name,
        route_order,
        question_id,
        question,
        answer,
        latitude,
        longitude,
      });

      tx.executeSql(
        `INSERT OR REPLACE INTO adventures 
         (adventure_id, adventure_name, route_order, question_id, question, answer, latitude, longitude) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [adventure_id, adventure_name, route_order, question_id, question, answer, latitude, longitude],
        () => console.log(`Adventure question ${question_id} upserted successfully`),
        (_: any, error: any) => {
          console.error('Error upserting adventure:', error);
          return true;
        }
      );
    });
  }

  // Recupero di tutte le avventure
  getAdventures(callback: (adventures: any[]) => void): void {
    this.db.transaction((tx: any) => {
      tx.executeSql(
        `SELECT DISTINCT adventure_id, adventure_name 
         FROM adventures;`,
        [],
        (_: any, results: any) => {
          const adventures = [];
          for (let i = 0; i < results.rows.length; i++) {
            adventures.push(results.rows.item(i));
          }
          console.log('Adventures fetched from local DB:', adventures); // Log aggiuntivo per verificare i dati
          callback(adventures);
        },
        (_: any, error: any) => {
          console.error('Error fetching adventures:', error);
          return true;
        }
      );
    });
  }

  // Recupero delle domande specifiche per un determinato adventure_id
  getQuestionsById(adventure_id: string, callback: (questions: any[]) => void): void {
    this.db.transaction((tx: any) => {
      tx.executeSql(
        `SELECT question_id, question, answer, latitude, longitude, route_order  
         FROM adventures 
         WHERE adventure_id = ? 
         ORDER BY route_order;`,
        [adventure_id],
        (_: any, results: any) => {
          const questions = [];
          for (let i = 0; i < results.rows.length; i++) {
            questions.push(results.rows.item(i));
          }
          callback(questions);
        },
        (_: any, error: any) => {
          console.error('Error fetching questions by adventure_id:', error);
          return true;
        }
      );
    });
  }

  // Eliminazione di una domanda per question_id
  deleteAdventureQuestion(question_id: string): void {
    this.db.transaction((tx: any) => {
      tx.executeSql(
        'DELETE FROM adventures WHERE question_id = ?;',
        [question_id],
        () => console.log(`Question ${question_id} deleted successfully`),
        (_: any, error: any) => {
          console.error('Error deleting question:', error);
          return true;
        }
      );
    });
  }
}

export default SQLiteManager;
