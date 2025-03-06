import { ReactElement } from 'react';

export type ObjectValues<T> = T extends { [key: string]: infer U } ? U : never;

export type ElementChildrenType =
  | ElementChildren
  | RecursedChildren
  | (ElementChildren | RecursedChildren)[];

export type ElementChildren = ReactElement | boolean | null | undefined;

export type RecursedChildren = Iterable<ElementChildren>;

export type WithElementChildren = {
  children: ElementChildrenType;
};
export type WithStringChildren = {
  children: string;
};

export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type UUID = string;
export type ZeroToOne = number;
export type Seconds = number;

export type BearerToken = string;

export type ExhaustivePath<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${ExhaustivePath<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];
