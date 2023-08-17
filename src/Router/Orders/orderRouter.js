const { Router } = require("express");
const ordersHandler = require("../../Handlers/Orders/ordersHandler");

const orderRouter = Router();



orderRouter.post("/create", ordersHandler.createOrder)
orderRouter.delete("/cancel/:orderId", ordersHandler.cancelOrder)
orderRouter.get("/get-user-order/:userId", ordersHandler.getUserOrders)
orderRouter.get("/get-all-orders", ordersHandler.getAllOrders)



module.exports = orderRouter;