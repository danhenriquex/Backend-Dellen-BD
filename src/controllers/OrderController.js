const db = require('../database/connection');
const auth = require('./AuthController');

const insert_item = async (id_sale,item)=>{
    const sql = "INSERT INTO line_item (id_sale, id_product, quantity, price) VALUES ($1,$2,$3,$4)";

    const params = [id_sale, item[0], item[1], item[2]]
    try{
        const response = await db.query(sql,params)
        console.log('line item cadastrado id sale',id_sale)
        return true
    }catch(e){
        return false
    }
};

const total_amount = async (id_sale)=>{ //falta terminar
    const sql = "SELECT SUM (quantity * price) FROM line_item WHERE (id_sale = $1)";
    //const saleId  = req.params.id_sale//await get_client_order(req,res)
    const params = [id_sale];

    try {
        const response = await db.query(sql, params)
        return response.rows[0]['sum']
    } catch(e){
        return false
    }
};

const create_order = async (req,res)=>{
    const credentials = [req.body.email,req.body.password];
    const val = await auth.auth_client(credentials[0],credentials[1]);
    const clientId = val;
    const products = req.body.products;
    const date = new Date();
    const params = [date.toDateString(),0 , clientId]// [date, status, clientId]

    if(val){
        try{
            const sql = "INSERT INTO sale (date,status,id_client) VALUES ($1,$2,$3) RETURNING id";
            const response = await db.query(sql,params);
            var id_sale = response.rows[0].id;

            for(i = 0 ; i < products.length ;i++){
                await insert_item(id_sale,products[i]);
            }

            res.status(200).json({
                "message":"success"
            });
        }catch(e){
            res.status(500).json(e.detail)
        }
    }else{
        res.status(401).json({"error":"fail auth!"});
    }
};

const get_client_order = async(req,res)=>{ 
    const sql = "SELECT * FROM sale WHERE (id_client = $1)"
    const credentials = [req.body.email,req.body.password];
    const val = await auth.auth_client(credentials[0],credentials[1]);
    const clientId = val;
    const params = [clientId];
    if(val){
        try {
            const response = await db.query(sql,params);
            for(i =0; i< response.rows.length; i++){
                response.rows[i]['order amount '] = await total_amount(response.rows[i]['id'])
            }
            res.status(200).json({
                "message" : "success",
                "data" : response.rows,
            });

        } catch(e){
            res.status(500).json(e.detail);
        }
    }
};

const get_orders = async(req,res)=>{
    const sql = "SELECT * FROM sale";
    const response = await db.query(sql);

    res.status(200).json({
        "data":response.rows
    });
}
module.exports = {
    create_order,
    get_orders,
    total_amount,
    get_client_order
}

