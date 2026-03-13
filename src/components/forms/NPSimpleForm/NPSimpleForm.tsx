import React, { ReactElement, ReactNode, useMemo, useState } from 'react';
import { Formik, Form, FormikHelpers, FormikProps, FormikValues } from 'formik';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { NPCancelButton, NPSubmitButton } from '../../index';
import * as Yup from 'yup';

type FormValues = {
  firstName: string;
};

interface ChildFormProps {
  isEdit?: boolean;
  isReadOnly?: boolean;
}

interface NPSimpleFormProps {
  isReadOnly?: boolean;
  isEdit?: boolean;
  initialValues: FormikValues;
  onSubmit: (values: FormikValues) => void;
  onCancel: () => void;
  validationSchema?: Yup.ObjectSchema<FormValues>;
  title: string;
  children: ReactElement | ReactNode;
}

export const NPSimpleForm: React.FC<NPSimpleFormProps> = ({
  isReadOnly = false,
  isEdit = false,
  initialValues,
  onSubmit,
  onCancel,
  validationSchema,
  title,
  children,
}) => {
  const initialEditMode = useMemo(() => {
    if (isReadOnly) return false;
    return isEdit;
  }, [isReadOnly, isEdit]);

  const [editMode, setEditMode] = useState(initialEditMode);

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
      <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
            onSubmit(values);
            formikHelpers.setSubmitting(false);
          }}
      >
        {(formik: FormikProps<FormikValues>) => {
          const actualEditMode = isReadOnly ? false : editMode;

          const childWithProps = React.isValidElement(children)
              ? React.cloneElement(children as ReactElement<ChildFormProps>, {
                isEdit: actualEditMode,
                isReadOnly,
              })
              : children;

          const handleCancel = () => {
            formik.resetForm();

            if (!isReadOnly && !isEdit) {
              setEditMode(false);
            }

            onCancel();
          };

          return (
              <Card>
                <CardHeader>
                  <h4 className="mb-0">{title}</h4>
                </CardHeader>

                <CardBody>
                  <Form>
                    <div className="mb-4">{childWithProps}</div>

                    <Row>
                      <Col xs="auto">
                        <NPCancelButton text="Отмена" onClick={handleCancel} />
                      </Col>

                      {!isReadOnly && (
                          <Col xs="auto">
                            <NPSubmitButton
                                text={actualEditMode ? 'Сохранить' : 'Изменить'}
                                type={actualEditMode ? 'submit' : 'button'}
                                onClick={!actualEditMode ? handleEditClick : undefined}
                                isSubmitting={formik.isSubmitting}
                            />
                          </Col>
                      )}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
          );
        }}
      </Formik>
  );
};
