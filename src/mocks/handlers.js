import { rest } from "msw";

const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
];

export const handlers = [
  rest.get(
    "https://whizzniac-api.herokuapp.com/categories",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(categories));
    }
  ),
];
