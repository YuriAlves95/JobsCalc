const dataBase = require('./config')

//awayt: espera um comando ser executado antes de prosseguir
//async: define que uma função possui comandos a serem executados sequencialmente ou seja os awaits

const initDB = {
    async init() {
        const db = await dataBase()

        await db.exec(`CREATE TABLE Profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            hour_value INT
        )`)

        await db.exec(`CREATE TABLE Jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        await db.run(`INSERT INTO Profile (
            name,
            avatar,
            monthly_budget, 
            days_per_week,
            hours_per_day,
            vacation_per_year,
            hour_value
        ) VALUES(                        
            "Yuri",
            "https://i.pinimg.com/originals/e6/be/74/e6be74627bd89aca3c267b27d8b4d964.jpg",
            5000,
            5,
            5,
            3,
            0
        )`)

        await db.close()

        console.log('Banco de dados inicializado com sucesso!')
    }
}

initDB.init()






