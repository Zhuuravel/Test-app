import React, { ReactElement, ReactNode } from 'react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';

type FormValues =
    | { firstName: string }
    | { lastName: string }
    | { email: string };

export interface NPWizardPageProps {
  title: string;
  initialValues: FormikValues;
  validationSchema?: Yup.ObjectSchema<FormValues>;
  children: ReactElement | ReactNode;
}

export const NPWizardPage: React.FC<NPWizardPageProps> = ({ children }) => {
  return <>{children}</>;
};
