const db = require('../database/connection');

const auth_client = async (email,password)=>{
    const sql = "SELECT id FROM client WHERE (email = $1 AND password = $2)";
    
    try{
        const response = await db.query(sql,[email,password]);
        console.log(response.rowCount)
        console.log(response.rows[0].id)
        if(response.rowCount>0){
            return response.rows[0].id
        }
        return false
    }catch(e){
        return false
    }
}
const auth_seller = async (email,password)=>{
    const sql = "SELECT id FROM seller WHERE (email = $1 AND password = $2)";
    try{
        const response = await db.query(sql,[email,password]);
        console.log(response.rowCount)
        if(response.rowCount > 0){
            return true
        }
        return false
    }catch(e){
        console.log(e)
        return false
    }
}
module.exports = {
    auth_client,
    auth_seller,
    async login(req, res){
        
        const {email, password} = req.body;
        console.log({email, password});
        
        let rows = await db.query(
            'SELECT * FROM client WHERE email=$1 AND password=$2',
            [email, password]
        );

        let type = 1;

        if(!rows.rows.length){
            type = 0;
            rows = await db.query(
                'SELECT * FROM seller WHERE email=$1 AND password=$2',
                [email, password]
            );
        }

        res.status(200).json({
            "type": type,
            "data": rows.rows
        })
       
    },
}
