const profile = require("../model/Profile.js")

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await profile.get() })
    },
    async update(req, res) {
        //mais cálculos
        const reqData = req.body
        //52 = quantidade de semanas em um ano - as semanas de férias / meses do ano
        const weeksPerMonth = (52 - reqData["vacation-per-year"]) / 12
        //total de horas trabalhadas por semana
        const hourPerWeek = reqData["hours-per-day"] * reqData["days-per-week"]
        //total de horas trabalhadas por mes
        const monthlyHours = weeksPerMonth * hourPerWeek
        //valor da minha hora é quanto eu quero ganhar por mes / total de horas trabalhadas por mes
        const valueHour = reqData["monthly-budget"] / monthlyHours

        //aplica a propriedade hour-value do objeto o valor
        reqData["hour-value"] = valueHour

        //substitui o objeto Profile.data pelo novo com valores atualizados
        await profile.update(reqData)

        return res.redirect("/profile")
    }
}