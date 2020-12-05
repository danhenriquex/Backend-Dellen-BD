const db = require('../database/connection');
const auth = require('./AuthController');

const insert_item = async (id,item)=>{
    const sql = "INSERT INTO line_item (id_sale, id_product, quantity, price) VALUES ($1,$2,$3,$4)";

    const params = [id, item[0], item[1], item[2]]
    try{
        const response = await db.query(sql,params)
        console.log('line item cadastrado')
        return true
    }catch(e){
        console.log(e)
        return false
    }
};

const total_amount = async (req,res)=>{ //falta terminar
    const sql = "SELECT FROM line_item WHERE (id_sale = $1) SUM (quantity * price) AS total";
    get_client_order()
    const params = [saleId];


    try {
        const response = await db.query(sql, params)
        console.log("value = " + response.rows[0].total)
        return true
    } catch(e){
        console.log(e)
        return false
    }
};

const create_order = async (req,res)=>{
    const credentials = [req.body.email,req.body.password];
    const val = await auth.auth_client(credentials[0],credentials[1]);
    const clientId = val;
    const products = req.products;
    const date = new Date();
    const params = [date.toDateString(),0 , clientId]// [date, status, value]

    if(val){
        try{
            const sql = "INSERT INTO sale (date,status,id_client) VALUES ($1,$2,$3) RETURNING id";
            const response = await db.query(sql,params);
            var id = response.rows[0].id;
            
            console.log(products)

            for(item in products){
                
                insert_item(id,item);
            }

            res.status(200).json({
                "message":"success"
            });
        }catch(e){
            console.log(e)
            res.status(500).json(e.detail)
        }
    }else{
        res.status(401).json({"error":"fail auth!"});
    }
};

const update_order = async(req,res)=>{//falta terminar
    const sql = "UPDATE sale SET "

};
const get_client_order = async(req,res)=>{ //falta terminar
    const sql = "SELECT FROM sale WHERE (id_client = $1)"
    const credentials = [req.body.email,req.body.password];
    const val = await auth.auth_client(credentials[0],credentials[1]);
    const clientId = val;
    const params = [clientId];
    if(val){
        try {
            const response = await db.query(sql,params);
            res.status(200).json({
                "message" : "success",
                "data" : response.rows
            })
            return response.rows
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

