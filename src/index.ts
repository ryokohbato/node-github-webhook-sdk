import express from "express";

import verify from "./modules/verify";

import type { ConstructorArg, WatchCallback, WatchOption, WatchOptions } from "./@types";
import type { EventType } from "./@types/events";
import type { Express, Request, Response } from "express";

export class WebhookApp {
  secret: string;
  server: Express;
  options: WatchOptions[];

  constructor(arg: ConstructorArg) {
    this.secret = arg.secret;
    this.server = express();
    this.server.use(express.json());
    this.options = [];
  }

  watch(option: WatchOption, callback: WatchCallback) {
    this.options = [
      ...this.options,
      {
        option: option,
        callback: callback,
      },
    ];
  }

  start(port: number) {
    this.server.post("/", (request: Request, response: Response) => {
      if (request.headers["x-hub-signature-256"] === undefined) {
        // eslint-disable-next-line no-console
        console.error("`Secret` is not set");
        response.end();
        return;
      }

      if (
        !verify(
          this.secret,
          JSON.stringify(request.body),
          request.headers["x-hub-signature-256"] as string
        )
      ) {
        // eslint-disable-next-line no-console
        console.error("Invalid data");
        response.end();
        return;
      }

      this.options
        .filter(
          (option) =>
            option.option === "*" ||
            option.option.indexOf(request.headers["x-github-event"] as EventType) !== -1
        )
        .forEach((option) => {
          option.callback(request.body);
        });
      response.end();
    });

    this.server.listen(port);
  }
}
