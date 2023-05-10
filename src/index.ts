import express from "express";
import router from "express";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.clear();
  console.log(`HTTP server running on port ${PORT}`);
});
