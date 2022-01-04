import React from 'react'

export type MovieType = {
  id: number;
  title: string;
  background: string;
  mainBackground: string;
}

export type HTMLProps<T, U> = T & Omit<React.HTMLProps<U>, keyof T>
