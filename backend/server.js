
import "dotenv/config";
import app from "./src/app.js";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log("----------------------------------");
  console.log("GitSummarizer Backend Started!");
  console.log(`Server running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log("----------------------------------");
});
