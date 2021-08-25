const JobServices = require("../utils/JobUtils.js")
const JobsData = require("../model/Jobs.js")
const ProfileData = require("../model/Profile.js")


module.exports = {
    async save(req, res) {
        await JobsData.create({
            "name": req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            "created_at": Date.now()
        })

        return res.redirect('/')
    },
    create(req, res) {
        return res.render("job")
    },
    async show(req, res) {
        const jobsDataGet = await JobsData.get()

        const profileDataGet = await ProfileData.get()

        const idJob = req.params.id

        const job = jobsDataGet.find((job) => { return Number(job.id) === Number(idJob) })

        if (!job) {
            return res.send('Job Not Found!')
        }

        job.budget = JobServices.budgetCalc(job, profileDataGet["hour-value"])

        return res.render("job-edit", { job })
    },
    async update(req, res) {
        const updatedJob = {
            id: req.params.id,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
            created_at: Date.now()
        }

        await JobsData.update(updatedJob)

        res.redirect('/job/' + updatedJob.id)
    },
    async delete(req, res) {
        const idJobDel = req.params.id

        await JobsData.delete(idJobDel)

        res.redirect('/')
    }
}