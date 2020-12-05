const db = require('../database/connection');

module.exports = {
    async get_clients(req,res){
        const sql = "SELECT * from public.client";
        
        try{
            const response = await db.query(sql);
            
            res.status(200).json({
                "message":"success",
                "data":response.rows
            });
        }catch(e){
            res.status(401).json(e.detail);
        }
    },
    async get_sellers(req,res){
        const sql = "SELECT * from public.seller";
        try{
            const response = await db.query(sql);

            res.status(200).json({
                "message":"success",
                "data":response.rows
            });
        }catch(e){
            res.status(401).json(e.detail);
        }
    },
    async create_user(req,res){
        var sql = "INSERT INTO seller (name, email, password) VALUES ($1,$2,$3)";
        const {name, email, password, whatsapp} = req.body;
        var params = [name, email, password]

        if(whatsapp){
            sql = "INSERT INTO client (name, email, password, whatsapp) VALUES ($1,$2,$3,$4) RETURNING id";
            params = [name, email, password, whatsapp]
        }
        try{
            const response = await db.query(
                sql,
                params   
            );
            console.log(response.rows[0].id)
            res.status(201).json({
                "message":"success",
                "data":[name,email]
            });
        }catch(e){
            res.status(500).json(e.detail);
        }
        
    },
    async update_user(req,res){//Falta arrumar essa rota
        var sql = "UPDATE seller SET password = $1 WHERE (email = $2 AND password = $3)";
        var params = [req.body.new_password, req.body.email, req.body.password];

        if(req.body.new_whatsapp){
            sql = "UPDATE client SET password = $1, whatsapp = $2 WHERE (email = $3 AND password = $4)";
            params = [req.body.new_password, req.body.new_whatsapp, req.body.email, req.body.password];
        }

        try{
            const response = await db.query(
                sql,
                params
            );
            console.log(response)
            if(response.rowCount){
                res.status(200).json({
                    "message":"User Updated Successfully",
                });
            }else{
                res.status(401).json({
                    "message":"Fail auth"
                });
            }            
        }catch(e){
            res.status(500).json(e);
        }
        
    },
    async get_client(req,res){
        var sql = "SELECT * FROM client WHERE (email = $1 AND password = $2)";
        const {email,password} = req.body
        
        try{
            const response = await db.query(
                sql,
                [email,password],
            );
            res.status(200).json({
                "message":"success",
                "data":response.rows
            });
        }catch(e){
            res.status(500).json(e.detail);
        }
    }
}