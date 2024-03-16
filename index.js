import express from "express"
//import crypto from "crypto"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from  "body-parser"
//import axios from "axios"
//import  Flutterwave from 'flutterwave-node-v3'
import got from "got"
import mysql from "mysql"

 dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}))

//const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
//const tx_ref =  flw.generateTransactionReference()
 const PORT = process.env.PORT

 app.post('/deposit',async(req,res)=>{
    const {amount,number,clientName,
        clientContact,
        delivery_staff,
        delivery_status,
        subTotalValue,
        vatValue,
   totalAmountValue, 
   discount, 
   grandTotalValue,
   paid ,
   dueValue,
   paymentType,
   paymentStatus,
   paymentPlace,
   gstn,
   userid,username} = req.body 
    console.log({amount,number})
   /*try {
        const payload = {
            "tx_ref": "MC-158523s09v5050e8", 
            "order_id": "USS_URG_893982923s2323",
            "amount": amount,
            "currency": "RWF",
            "email": "kivinab1@gmail.com",
            "phone_number": number,
            "fullname": "Ntuyenabo Abdallah"
        }

       const response =  await flw.MobileMoney.rwanda(payload)
          console.log()
           res.status(200).json(response)

    } catch (error) {
        console.log(error)
    }  */
     const time = Date.now()

try {
    const response = await got.post("https://api.flutterwave.com/v3/payments", {
        headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        },
        json: {
            tx_ref: time,
            amount: amount,
            currency: "RWF",
            redirect_url: "http:/gasmark/success.html",
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            },
            customer: {
                email: "maliqcedric32@gmail.com",
                phonenumber:number,
                name: "Tuyikunde Cedric"
            },
            customizations: {
                title: "Paid Gas",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
            }
        }
    })
     const data = JSON.parse(response.body)
    console.log({
       status:data.status,
       link:data.data.link
    });
   res.status(200).json(JSON.parse(response.body))

   const date = new Date();
   const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
   const formattedDate = formatter.format(date);
   let orderDate = formattedDate

    console.log({orderDate,amount, number,clientName,clientContact,delivery_staff,
    delivery_status,subTotalValue,vatValue,
   totalAmountValue, discount, grandTotalValue,paid ,dueValue,
   paymentType,paymentStatus,paymentPlace,gstn,userid,username
})
   
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gas_port"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO orders (order_date, client_name, client_contact,delivery_staff,delivery_status, sub_total, vat, total_amount, discount, grand_total, paid, due, payment_type, payment_status,payment_place, gstn,order_status,user_id) VALUES ("${orderDate}","${clientName}","${clientContact}","${delivery_staff}","${delivery_status}","${subTotalValue}","${vatValue}","${totalAmountValue}","${discount}","${grandTotalValue}","${paid}","${dueValue}","${paymentType}","${paymentStatus}","${paymentPlace}","${gstn}","${1}","${userid}")`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });


} catch (err) {
    console.log(err);

}

})
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})
app.post('/create',async(req,res)=>{
    const {amount,number,clientName,
        clientContact,
        delivery_staff,
        delivery_status,
        subTotalValue,
        vatValue,
   totalAmountValue, 
   discount, 
   grandTotalValue,
   paid ,
   dueValue,
   paymentType,
   paymentStatus,
   paymentPlace,
   gstn,
   userid,username} = req.body 
    console.log({amount,number})
   
     const time = Date.now()

try {
    const response = await got.post("https://api.flutterwave.com/v3/payments", {
        headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        },
        json: {
            tx_ref: time,
            amount: amount,
            currency: "RWF",
            redirect_url: "http:/gasmark/success.html",
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            },
            customer: {
                email: "maliqcedric32@gmail.com",
                phonenumber:number,
                name: "Tuyikunde Cedric"
            },
            customizations: {
                title: "Paid Gas",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
            }
        }
    })
     const data = JSON.parse(response.body)
    console.log({
       status:data.status,
       link:data.data.link
    });
   res.status(200).json(JSON.parse(response.body))

   const date = new Date();
  // const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
  // const formattedDate = formatter.format(date);
   let orderDate = date
   const mysql_PORT = 3306
    console.log({orderDate,amount, number,clientName,clientContact,delivery_staff,
    delivery_status,subTotalValue,vatValue,
   totalAmountValue, discount, grandTotalValue,paid ,dueValue,
   paymentType,paymentStatus,paymentPlace,gstn,userid,username
})

var con = mysql.createConnection({
    host: `${mysql_PORT}`,
    user: "root",
    password: "",
    database: "gas_port"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO orders (order_date, client_name, client_contact,delivery_staff,delivery_status, sub_total, vat, total_amount, discount, grand_total, paid, due, payment_type, payment_status,payment_place, gstn,order_status,user_id) VALUES ("${orderDate}","${clientName}","${clientContact}","${delivery_staff}","${delivery_status}","${subTotalValue}","${vatValue}","${totalAmountValue}","${discount}","${grandTotalValue}","${paid}","${dueValue}","${paymentType}","${paymentStatus}","${paymentPlace}","${gstn}","${1}","${userid}")`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log("successfully")
    });
  });


} catch (err) {
    console.log(err);

}
})






 // This was For Create End Point

 /*
      const { amount,
        number,
        clientName,
        clientContact,
        delivery_staff,
        delivery_status,
        subTotalValue,
        vatValue,
   totalAmountValue, 
   discount, 
   grandTotalValue,
   paid ,
   dueValue,
   paymentType,
   paymentStatus,
   paymentPlace,
   gstn,
   userid,username} = req.body 

   const date = new Date();
   const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
   const formattedDate = formatter.format(date);
   let orderDate = formattedDate

    console.log({orderDate,amount, number,clientName,clientContact,delivery_staff,
    delivery_status,subTotalValue,vatValue,
   totalAmountValue, discount, grandTotalValue,paid ,dueValue,
   paymentType,paymentStatus,paymentPlace,gstn,userid,username
})
    try {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "gas_port"
          });
          
          con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `INSERT INTO orders (order_date, client_name, client_contact,delivery_staff,delivery_status, sub_total, vat, total_amount, discount, grand_total, paid, due, payment_type, payment_status,payment_place, gstn,order_status,user_id) VALUES ("${orderDate}","${clientName}","${clientContact}","${delivery_staff}","${delivery_status}","${subTotalValue}","${vatValue}","${totalAmountValue}","${discount}","${grandTotalValue}","${paid}","${dueValue}","${paymentType}","${paymentStatus}","${paymentPlace}","${gstn}","${1}","${userid}")`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });
          });
    } catch (error) {
       console.log(error) 
    }
 */

 app.get('/callback',async(req,res)=>{
    const txt_id = req.params;
    console.log(txt_id)
 })
