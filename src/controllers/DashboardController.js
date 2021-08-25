const JobsData = require("../model/Jobs.js")
const ProfileData = require("../model/Profile.js")
const JobServices = require("../utils/JobUtils.js")

module.exports = {
    async index(req, res) {
        const jobsDataGet = await JobsData.get()

        const profileDataGet = await ProfileData.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobsDataGet.length,
            freeHours: profileDataGet["hours-per-day"]
        }
        //ajustes job, cálculos de tempo restante ..etc (W.I.P.)        
        //map percorre e retorna um novo array, o foreach apenas percorre cada elemento
        const updatedJobs = jobsDataGet.map((job) => {
            const daysLeft = JobServices.remainingDaysCalc(job)
            const status = daysLeft <= 0 ? 'done' : 'progress'

            statusCount[status] += 1

            if (status == 'progress')
                statusCount.freeHours -= job["daily-hours"]

            //retorna um novo objeto
            return {
                //espalhamento (...) pega o elemento do array e adiciona novos elementos
                ...job,
                daysLeft,
                status,
                budget: JobServices.budgetCalc(job, profileDataGet["hour-value"])
            }
        })
        //sintaxe: nomeParametro: Parametro ... obs pode ser passado apenas o parametro, fará que o nome dele seja o mesmo
        res.render("index", { jobs: updatedJobs, profile: profileDataGet, statusCount })
    }
}