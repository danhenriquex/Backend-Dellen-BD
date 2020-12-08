const {Pool} = require('pg');
const connectionString = 'postgresql://postgres:postgres@localhost:5432/ellen'

const pool = new Pool({
  connectionString,
});

pool.connect((err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("BD CONECTADO COM SUCESSO!")
  }
});

module.exports = {
  query: (text,params) => pool.query(text,params),
};



