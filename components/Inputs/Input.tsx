import { ErrorMessage, Field } from "formik";
import React from "react";

type Props = {
  id?: string;
  errors?: any;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  children?: React.ReactNode;
  defaultValue?: string;
  multiple?: boolean;
  disabled?: boolean;
};

const Input = (props: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={props.name}
        className="font-semibold leading-tight text-slate-800 dark:text-white"
      >
        {props.label}
      </label>
      {(props.type === "text" ||
        props.type === "email" ||
        props.type === "password" ||
        props.type === "number") && (
        <Field
          id={props.id}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          // required
          disabled={props.disabled || false}
          className={`py-2 px-4 rounded-lg w-full text-slate-800 dark:text-white bg-transparent ring-2 shadow-md disabled:ring-lime-800 ${
            props.errors ? "ring-red-500" : "ring-lime-500"
          } disabled:cursor-not-allowed`}
          defaultValue={props.defaultValue}
          // tabIndex={0}
          // autoFocus={true}
        />
      )}

      {props.type === "select" && (
        <Field
          id={props.id}
          as={props.type}
          name={props.name}
          placeholder={props.placeholder}
          required
          className={`py-2 px-4 rounded-lg w-full text-slate-800 dark:text-white bg-transparent ring-2 shadow-md ${
            props.errors ? "ring-red-500" : "ring-lime-500"
          }`}
          tabIndex={0}
          autoFocus={true}
          multiple={props.multiple}
          // value=""
          // defaultValue={props.defaultValue}
        >
          <option value="">{props.defaultValue}</option>
          {props.children}
        </Field>
      )}
      <ErrorMessage
        key={props.errors}
        name={props.name}
        component="span"
        className="text-red-500"
      />
    </div>
  );
};

export default Input;
