const dataBase = require('../db/config')

module.exports = {
    async get() {
        const db = await dataBase()

        const jobs = await db.all(`SELECT * FROM Jobs`)

        await db.close()

        //passa cada elemento do array jobs como parametro nomeado de job e devolve um novo array
        //ou remonta o array passando cada elemento como um novo 
        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
        }))
    },
    async update(newJob) {
        const db = await dataBase()

        await db.run(`UPDATE Jobs SET 
        name = "${newJob.name}",
        daily_hours = ${newJob["daily-hours"]},
        total_hours = ${newJob["total-hours"]},
        created_at = ${newJob.created_at}
        WHERE Jobs.id = ${newJob.id}`)

        await db.close()
    },
    async delete(idJob) {
        const db = await dataBase()

        await db.run(`DELETE FROM Jobs WHERE id = ${idJob}`)

        await db.close()
    },
    async create(newJob) {
        const db = await dataBase()

        await db.all(`INSERT INTO Jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES(
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        await db.close()
    }
}