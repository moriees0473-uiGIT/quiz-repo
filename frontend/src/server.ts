// backend/src/server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app); // ExpressアプリとHTTPサーバーを紐付け

// ２．ここでSocket.IOを初期化し、CORS設定を行います
const io = new Server(server, {
  cors: {
    // 本番環境(Render)のURL、またはローカル開発用のURL
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// 通信の受付処理を記述
io.on('connection', (socket) => {
  console.log('クライアントが接続しました:', socket.id);
  
  // 解答データの受信イベントなどをここに定義していきます
  // socket.on('submit_answer', (data) => { ... });
});

// Renderから割り当てられるポート、またはローカル用の3000番を使用
const PORT = process.env.PORT || 3000;

// サーバーの待ち受けを開始
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});