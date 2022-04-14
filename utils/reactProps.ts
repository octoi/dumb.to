// Why react ? why u guys removed `children` from React.FC 🚶‍♂️

import React from 'react';
import { PropsWithChildren } from 'react';

type EmptyProps = {};

export type ReactChild = React.FC<PropsWithChildren<EmptyProps>>;
export type ReactChildWithProps<Props> = React.FC<PropsWithChildren<Props>>;
export type ReactProps<Props> = React.FC<Props>;
