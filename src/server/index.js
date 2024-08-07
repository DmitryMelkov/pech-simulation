import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware для обработки JSON и URL-encoded данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware для раздачи статических файлов, например, из папки 'public'
app.use(express.static(path.join(__dirname, '../../public')));

// Импортируем маршруты
import testRoutes from '../routes/testRoutes.js';
app.use(testRoutes);

const port = process.env.PORT || 96;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
