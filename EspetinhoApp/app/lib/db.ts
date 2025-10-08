import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(process.cwd(), process.env.DATABASE_PATH || './data/db.db');

// Garante que a pasta exista
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

// Cria a conexão
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    initializeDatabase();
  }
});

// Inicializa o banco se necessário
export function initializeDatabase() {
  const dbExists = fs.existsSync(dbPath);
  if (!dbExists) {
    console.log('Criando banco de dados e tabelas...');

    db.exec(`
      CREATE TABLE MESAS (
          id INTEGER PRIMARY KEY AUTOINCREMENT
      );

      CREATE TABLE PRODUTOS (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          imagem BLOB,
          valor DECIMAL(20,2),
          nome TEXT
      );

      CREATE TABLE PEDIDOS (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data DATETIME,
          situacao TEXT CHECK(situacao IN ('ABERTO', 'PAGO', 'CANCELADO'))
      );

      CREATE TABLE PEDIDOITEM (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_produto INTEGER,
          id_pedido INTEGER,
          quantidade INTEGER,
          valor DECIMAL(20,2),
          FOREIGN KEY (id_produto) REFERENCES PRODUTO(id),
          FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id)
      );
    `);

    console.log('Banco de dados inicializado com sucesso!');
  }
}

export default db;


export async function getQuery<T = unknown>(
  sql: string,
  params: any[] = []
): Promise<T | null> {
  try {
    const result = await new Promise<T>((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as T);
        }
      });
    });

    return result;
  } catch (error) {
    console.error('Erro ao executar query:', (error as Error).message);
    return null;
  }
}

export async function getAll<T = unknown>(
  sql: string,
  params: any[] = []
): Promise<{ success: boolean; data?: T[]; error?: string }> {
  try {
    const result = await new Promise<T[]>((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function runMutation(
  sql: string,
  params: any[] = []
): Promise<{ success: boolean; changes?: number; error?: string }> {
  try {
    const result = await new Promise<{ changes: number }>((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes }); // this.changes = número de linhas afetadas
        }
      });
    });

    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}