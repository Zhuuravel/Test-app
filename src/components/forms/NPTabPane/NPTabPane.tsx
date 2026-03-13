import React, { ReactElement, ReactNode } from 'react';
import {FormikValues} from 'formik';
import * as Yup from 'yup';

type FormValues =
    | { firstName: string }
    | { lastName: string }
    | { email: string };

export interface NPTabPaneChildProps {
  isEdit?: boolean;
  isReadOnly?: boolean;
}

export interface NPTabPaneProps {
  title: string;
  initialValues: FormikValues;
  validationSchema?: Yup.ObjectSchema<FormValues>;
  children: ReactElement | ReactNode;
}

export const NPTabPane: React.FC<NPTabPaneProps> = ({ children }) => {
  return <>{children}</>;
};
