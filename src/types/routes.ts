import { Route } from 'next';

export type AppRoute = Route<
  | "/"
  | "/login"
  | `/profile/${string}`
  | "/library"
  | "/community"
  | "/dashboard"
  | "/reset-password"
  | "/articles"
  | `/articles/${string}`
>; 