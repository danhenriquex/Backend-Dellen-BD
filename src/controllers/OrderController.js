const db = require('../database/connection');
const auth = require('./AuthController');


const insert_item = async (id_sale,item)=>{
    const sql = "INSERT INTO line_item (id_sale, id_product, quantity, price) VALUES ($1,$2,$3,$4)";
    console.log(item)
    const params = [id_sale, item[0], item[1], item[2]]
    try{
        const response = await db.query(sql,params)
        console.log('line item cadastrado id sale',id_sale)
        return true
    }catch(e){
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
    /* const credentials = [req.body.email,req.body.password]; */
    /* const val = await auth.auth_client(credentials[0],credentials[1]); */
    /* const clientId = val; */
    const products = req.body.products;
    const date = new Date();
    const params = [date.toDateString(),0 , parseInt(req.body.id)]// [date, status, value]
    
    
    
    try{
        const sql = "INSERT INTO sale (date,status,id_client) VALUES ($1,$2,$3) RETURNING id";
        const response = await db.query(sql,params);
        var id_sale = response.rows[0].id;

        for(let i = 0 ; i < products.length ;i++){
            const q = await db.query('select quantity from product where id=$1', [products[i][0]]);
            const up = await db.query(`update product set quantity = $1 where id=$2`, [q.rows[0].quantity - products[i][1],products[i][0]]);
            await insert_item(id_sale,products[i]);
        }
        console.log('update');
        res.status(200).json({
            "message":"success"
        });
    }catch(e){
        res.status(500).json(e.detail)
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
    const sql = "SELECT * FROM sale where id=$1";
    const response = await db.query(sql, [req.params.id]);

    res.status(200).json({
        "data":response.rows
    });
}
module.exports = {
    create_order,
    get_orders,
    total_amount,
    get_client_order,
}

