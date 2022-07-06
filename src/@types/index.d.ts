import type { EventType } from "./events";

export interface ConstructorArg {
  secret: string;
}

export type WatchOption = "*" | [EventType, ...EventType[]];

// eslint-disable-next-line no-unused-vars
export type WatchCallback = (data: any) => void;

export interface WatchOptions {
  option: WatchOption;
  callback: WatchCallback;
}
