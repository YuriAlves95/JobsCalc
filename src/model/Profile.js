const dataBase = require('../db/config')

module.exports = {
    async get() {
        const db = await dataBase()

        const data = await db.get('SELECT * FROM Profile')

        await db.close()

        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "hour-value": data.hour_value
        }
    },
    async update(newData) {
        const db = await dataBase()

        await db.run(`UPDATE Profile SET
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget = ${newData["monthly-budget"]},
            days_per_week = ${newData["days-per-week"]},
            hours_per_day = ${newData["hours-per-day"]},
            vacation_per_year = ${newData["vacation-per-year"]},
            hour_value = ${newData["hour-value"]}
        `)

        await db.close()
    }
}