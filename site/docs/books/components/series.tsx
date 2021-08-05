import React from 'react';

import { Book } from './book';

export const Series = ({series}) => (
    <>{series?.books.map((book,key) => <Book key={key} book={book}/>)}</>
)