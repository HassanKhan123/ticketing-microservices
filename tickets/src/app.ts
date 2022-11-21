import express from "express";
import { json } from "body-parser";
import "express-async-errors";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@hkticketing/common";
import { createTickerRouter } from "./routes/new";
import { showTickerRouter } from "./routes/show";
import { indexTickerRouter } from "./routes";
import { updateTickerRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);

app.use(createTickerRouter);
app.use(indexTickerRouter);
app.use(showTickerRouter);
app.use(updateTickerRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
