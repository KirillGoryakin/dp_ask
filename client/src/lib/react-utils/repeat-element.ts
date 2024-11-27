import { cloneElement } from 'react';

export function repeatElement(times: number, element: React.ReactElement) {
  const nodes: React.ReactElement[] = [];
  for (let i = 0; i < times; i++) nodes.push(cloneElement(element, { key: i }));
  return nodes;
}
