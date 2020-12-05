const db = require('../database/connection');
const auth = require('./AuthController');

module.exports = {
    async index(req,res){
        const sql = "SELECT * FROM category";
        try{
            const response = await db.query(sql);
            res.status(200).json({
                "message":"success",
                "data":response.rows
            });
        }catch(e){
            res.status(500).json(e.detail);
        }
        
    },
    async create(req,res){
        try{
            const {email,password,category_name} = req.body;
            const val = await auth.auth_seller(email,password);

            if(!val){
                res.status(203).json({"error":"fail auth"});  
            }else{
                const sql = "INSERT INTO category (name) VALUES ($1)";;
            
                const {rows} = await db.query(sql,[category_name]);
                res.status(200).json({
                    "message":"success",
                    "data":[category_name]
                });
            }
            
        }catch(e){
            res.status(500).json(e.detail);
        }
    },
}
    