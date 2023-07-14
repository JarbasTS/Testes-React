import React from 'react';

import './Card.css';

export default function Card(props: { children: React.ReactFragment }) {
  return <div className="card">{props.children}</div>;
}
