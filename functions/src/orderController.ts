/* eslint-disable */

import {Response} from "express";
import {db} from "./config/firebase";

// type OrderType = {
//     order: Order
// }

type Order = {
    number: string,
    status: string,
    email: string,
    firstname: string,
    lastname: string,
    updatedAt: string
}

type Request = {
    body: Order,
    params: { orderId: string }
}

const addOrder = async (req: Request, res: Response) => {
  const {number, status, email, firstname, lastname, updatedAt} = req.body;
  try {
    // const allOrders: Order[] = [];
    // const querySnapshot = await db.collection("orders").get();
    // querySnapshot.forEach((doc: any) => allOrders.push(doc.data()));

    // allOrders.filter(specificOrder => specificOrder.updatedAt !== updatedAt);

    const order = db.collection("orders").doc();
    const orderObject = {
      id: order.id,
      number,
      status,
      email,
      firstname,
      lastname,
      updatedAt
    };

    order.set(orderObject);

    res.status(200).send({
      status: "success",
      message: "order added successfully",
      data: orderObject,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders: Order[] = [];
    const querySnapshot = await db.collection("orders").get();
    querySnapshot.forEach((doc: any) => allOrders.push(doc.data()));
    return res.status(200).json(allOrders);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {addOrder, getAllOrders};