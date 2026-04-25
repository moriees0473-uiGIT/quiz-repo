const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // RenderのフロントURLを指定
    methods: ["GET", "POST"]
  }
});