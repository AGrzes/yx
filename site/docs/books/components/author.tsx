import React from 'react';

import { Series } from './series';

export const Author = ({author}) => (
    <>{author?.series.map((series, key) => <Series key={key} series={series}/>)}</>
)