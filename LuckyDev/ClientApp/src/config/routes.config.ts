import type { ComponentType } from 'react';
import type { Params } from 'react-router-dom';
import { Catalogue }  from '../containers';

export type RouteComponent = ComponentType<any>;

export type Route = Readonly<{
  name: string;
  path: string;
  Component: RouteComponent;
  params?: Readonly<Params<string>>;
}>;

export const Routes: Route[] = [
  {
    name:'home',
    path: '/',
    Component: Catalogue,
  },
];