import { app, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import path from 'node:path';

import next from 'next';
import { createServer } from 'node:http';

import { fileURLToPath } from 'node:url';

import { initializeDatabase } from '../app/lib/db.ts'

initializeDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
    // 🔐 Intercepta navegações internas para evitar 404
  win.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    win.loadURL(url);
  });

  // 🔐 Bloqueia abertura de novas janelas externas
  win.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  if (app.isPackaged) {
    const nextApp = next({ dev: false, dir: path.join(__dirname, '..') });
    const handle = nextApp.getRequestHandler();

    nextApp.prepare().then(() => {
      const server = createServer((req, res) => handle(req, res));
      server.listen(3000, () => {
        win.loadURL('http://localhost:3000');
      });
    });
  } else {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  }

  if (app.isPackaged) {
    // Servir o Next em modo produção

    const nextApp = next({ dev: false, dir: path.join(__dirname, '..') });
    const handle = nextApp.getRequestHandler();
  
    nextApp.prepare().then(() => {
      const server = createServer((req, res) => handle(req, res));
      server.listen(3000, () => {
        win.loadURL('http://localhost:3000');
      });
    });
  } else {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  }
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});