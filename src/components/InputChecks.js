import React from "react";
export function emptystringcheck(s) {
  return s == "" ? true : false;
}
export function positivenumbercheck(number) {
  console.log("handle positive number func run!");
  return number > 0 ? true : false;
}
export function numbergreathercheck(numbertocompare, num) {
  return numbertocompare < num ? true : false;
}
export function numberlesscheck(numbertocompare, num) {
  return numbertocompare > num ? true : false;
}
