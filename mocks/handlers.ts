import { rest } from "msw";
import { Categories } from "./CategoryResponse";
import { LoginResponse } from "./LoginResponse";
import { Products } from "./ProductsResponse";
import { Receipts } from "./ReceiptsResponse";
import { Stores, Store } from "./StoresResponse";
import { Transactions } from "./TransactionsResponse";

const baseUrl = `http://localhost:8810/api`;
export const handlers = [
  rest.get(`${baseUrl}/login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(LoginResponse));
  }),
  rest.get(`${baseUrl}/stores`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Stores));
  }),
  rest.get(`${baseUrl}/stores/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Store));
  }),
  rest.get(`${baseUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Products));
  }),
  rest.get(`${baseUrl}/transactions`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Transactions));
  }),
  rest.get(`${baseUrl}/receipts`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Receipts));
  }),
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Categories));
  }),
];
