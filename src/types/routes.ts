import { Route } from 'next';

export type AppRoute = Route<
  | "/"
  | "/login"
  | "/profile"
  | "/library"
  | "/community"
  | "/dashboard"
  | "/reset-password"
  | "/articles"
>;
