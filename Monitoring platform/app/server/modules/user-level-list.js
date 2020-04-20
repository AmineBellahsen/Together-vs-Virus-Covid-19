levels = [
    {id:2 , name:"Super Administrator"},
    {id:1 , name:"Administrator"},
    {id:0 , name:"Supervisor"}
]
module.exports.levels = levels

module.exports.suLevel = levels.filter(item => item.name.includes("Super Admin"));