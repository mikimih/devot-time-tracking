import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Spinner() {
  return (
    <ProgressSpinner
      strokeWidth='5'
      className='[&>svg>circle]:!stroke-primary-100 m-[32px_auto]'
    />
  );
}
