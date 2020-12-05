const {Pool} = require('pg');
const connectionString = 'postgresql://postgres:vncssnts321@127.0.0.1:3001/postgres'

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



