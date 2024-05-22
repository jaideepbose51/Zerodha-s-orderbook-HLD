import bodyParser from "body-parser";
import express from "express";

const app=express();
app.use(bodyParser.json());

interface Balance{
    [key:string]:number;
}

interface User{
    id:string;
    balances:Balance;
}

interface Orders{
    userId:string;
    price:number;
    quantity: number;
}

export const TICKER="GOOGLE";

const users:User[]=[{
    id:"1",
    balances:{
        "GOOGLE":10,
        "USD":50000
    }
},{
    id:"2",
    balances:{
        "GOOGLE":10,
        "USD":50000
    }
}];

const bids:Orders[] = [];
const asks:Orders[] = [];

// Define fillOrders function here
// ...
const fillOrders = (side: string, price: number, quantity: number, userId: string): number => {
    // Simplified fillOrders function
    // Implement matching logic here. For now, just return the same quantity as not filled.
    return quantity;

app.post("/orders",(req:any,res:any)=>{
    const side: string=req.body.side;
    const price : number =req.body.price;
    const quantity : number=req.body.quantity;
    const userId: string=req.body.userId;

    const remainingQuantity= fillOrders(side,price,quantity,userId);

    if(remainingQuantity===0){
        res.json({filledQuantity:quantity});
        return;
    }

    if(side=="bid") {
        bids.push({
            userId,
            price,
            quantity:remainingQuantity
        });
        bids.sort((a,b)=>a.price<b.price?-1:1);
    } else {
        asks.push({
            userId,
            price,
            quantity:remainingQuantity
        });
        asks.sort((a,b)=>a.price<b.price?-1:1);
    }
    res.json({
        filledQuantity:quantity-remainingQuantity
    })
})

app.get("/depth",(req:any,res:any) => {
    const depth:{
        [price:string]:{
            type : "bid"|"ask",
            quantity:number,
        }
    }={};

    for(let i=0 ; i<bids.length; i++) {
        if(!depth[bids[i].price]){
            depth[bids[i].price]={
                quantity:bids[i].quantity,
                type:"bid"
            }
        } else {
            depth[bids[i].price].quantity+=bids[i].quantity;
        }
    }
    for(let i=0 ; i<asks.length; i++) {
        if(!depth[asks[i].price]){
            depth[asks[i].price]={
                quantity:asks[i].quantity,
                type:"ask"
            }
        } else {
            depth[asks[i].price].quantity+=asks[i].quantity;
        }
    }
    res.json({depth});
})


app.get("/balances/:userId",(req,res)=>{
    const userId=req.params.userId;
    const user=users.find(x=>x.id===userId);
    if (!user){
        return res.json({
            USD:0,
            [TICKER]:0
        })
    }
    res.json({balances:user.balances});
})

app.get("/quote")