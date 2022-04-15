// Why react ? why u guys removed `children` from React.FC 🚶‍♂️

import React from 'react';
import { PropsWithChildren } from 'react';

export type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;
