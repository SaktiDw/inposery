import { rest } from "msw";
import {
  DashboardMock,
  getTopProductMock,
  ProductsMock,
  ReceiptsMock,
  StoreMock,
  StoresMock,
  TransactionsMock,
  UserMock,
} from "./response";

const baseUrl = process.env.API_URL;
export const handlers = [
  rest.get(`http://localhost:8000/api/user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(UserMock));
  }),
  rest.get(`http://localhost:8000/api/dashboard`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DashboardMock));
  }),
  rest.get(`http://localhost:8000/api/getTopProduct`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getTopProductMock));
  }),
  rest.get(`http://localhost:8000/api/stores`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(StoresMock));
  }),
  rest.get(`http://localhost:8000/api/stores/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(StoreMock));
  }),
  rest.get(`http://localhost:8000/api/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ProductsMock));
  }),
  rest.get(`http://localhost:8000/api/transactions`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TransactionsMock));
  }),
  rest.get(`http://localhost:8000/api/receipts`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(ReceiptsMock));
  }),
  // rest.get(`http://localhost:8000/api/categories`, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(null));
  // }),
  // rest.get(`http://localhost:8000/api/getTopProduct/`, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(null));
  // }),
];
