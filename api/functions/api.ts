// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
import express from "express";
import serverless from "serverless-http";
import app from "../src/app";

const api = express();

api.use("/api/", app);

export const handler = serverless(api);
