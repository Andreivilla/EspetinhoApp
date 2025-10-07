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
      CREATE TABLE MESA (
        id INTEGER PRIMARY KEY AUTOINCREMENT
      );

      CREATE TABLE PRODUTO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image BLOB,
        valor DECIMAL(20,2),
        nome TEXT
      );

      CREATE TABLE PEDIDO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data DATETIME,
        situacao TEXT CHECK(situacao IN ('ABERTO', 'PAGO', 'CANCELADO'))
      );

      CREATE TABLE PEDIDOITEM (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produto INTEGER,
        id_pedido INTEGER,
        quantidade INTEGER,
        preco DECIMAL(20,2),
        FOREIGN KEY (id_produto) REFERENCES PRODUTO(id),
        FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id)
      );
    `);

    console.log('Banco de dados inicializado com sucesso!');
  }
}

export default db;
