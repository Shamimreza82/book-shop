"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const createOrderDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(order);
    return result;
});
const totalRevenueDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.aggregate([
            {
                $group: { _id: 'totalPrice', totalRevinew: { $sum: '$totalPrice' } },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: '$totalRevinew',
                },
            },
        ]);
        return result[0];
    }
    catch (error) {
        console.log(error);
    }
});
exports.orderService = {
    createOrderDB,
    totalRevenueDB
};
