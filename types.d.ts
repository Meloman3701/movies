import React from 'react'

export type MovieType = {
  id: number;
  title: string;
  uri: string;
  background: string;
  mainBackground: string;
  trailer: string;
}

export type HTMLProps<T, U> = T & Omit<React.HTMLProps<U>, keyof T>
