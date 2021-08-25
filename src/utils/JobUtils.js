module.exports = {
  remainingDaysCalc(job) {
    //calcula os dias restantes (horasTotais / HorasDiárias)       
    const reaminingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    //transforma a data de milisegundos, para data normal (dia/mes/ano...etc): Thu May 06 2021 22:06:36
    const createdDate = new Date(job.created_at)
    //extrai o dia (06) de createdDate e soma com os dias restantes.. para dar o dia em que deverá ser entregue
    const dueDay = createdDate.getDate() + Number(reaminingDays)
    //pega a data de criação e incrementa o numero de dias
    const dueDate = createdDate.setDate(dueDay)
    //devolve quantos dias falta em ms    
    const timeDiffMs = dueDate - Date.now()
    //divide os dias que faltam em ms pelo valor de um dia em ms (1 dia = 86.400.000ms)
    const msToDays = Math.ceil(timeDiffMs / (1000 * 60 * 60 * 24))

    return msToDays
  },
  budgetCalc(job, hourValue) {
    return hourValue * job["total-hours"]
  }
}