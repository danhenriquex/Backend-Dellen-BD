const {Pool} = require('pg');
const connectionString = 'postgresql://postgres:chrysler35@@127.0.0.1:5432/postgres'

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



