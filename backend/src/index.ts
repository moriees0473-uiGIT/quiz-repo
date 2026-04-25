const PORT = process.env.PORT || 3000; // Renderでは自動で10000番などが割り当てられます

// 重要: '0.0.0.0' を指定しないと外部からアクセスできない場合があります
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});