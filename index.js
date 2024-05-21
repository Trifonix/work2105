// Подключаем axios
const axios = require("axios");
// Подключаем path
const path = require("path");
// Подключаем fs
const fs = require("fs");
// Подключаем http
const http = require("http");

// Используя http запускаем локальный сервер через порт 3000
http.createServer((request, response) => {
    response.setHeader("Content-type", "text/html; charset=utf-8;")
    if (request.url !== "/app") {
        response.write('Вы находитесь в директории веб-приложения. Перейдите на /app');
    } else if (request.url === "/app") {
        // Используя axios делаем запрос к API
        // https://jsonplaceholder.typicode.com/todos
        ;(async () => {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
            fs.writeFile(path.resolve(__dirname, 'todos.json'), JSON.stringify(data), 'utf-8', (err) => {
                if (err) throw err;
            })
        })();
        response.write('Файл todos.json создан.');
    }
    response.end();
}).listen(3000);