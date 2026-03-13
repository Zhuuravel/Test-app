import React, { ReactElement, ReactNode, useState } from 'react';
import { Formik, Form, FormikProps, FormikValues } from 'formik';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { NPCancelButton, NPSubmitButton } from '../../';
import type { NPWizardPageProps } from '../../';

interface NPWizardProps {
  onSubmit: (values: FormikValues[]) => void;
  onCancel: () => void;
  title: string;
  children: ReactNode;
}

export const NPWizard: React.FC<NPWizardProps> = ({
  onSubmit,
  onCancel,
  title,
  children,
}) => {
  const pages = React.Children.toArray(children) as ReactElement<NPWizardPageProps>[];

  const [activePage, setActivePage] = useState(0);
  const [pageValues, setPageValues] = useState<FormikValues[]>(
      pages.map((page) => page.props.initialValues)
  );

  const currentPage = pages[activePage];
  const isFirstPage = activePage === 0;
  const isLastPage = activePage === pages.length - 1;

  return (
      <Formik
          enableReinitialize
          initialValues={pageValues[activePage]}
          validationSchema={currentPage.props.validationSchema}
          onSubmit={() => {}}
      >
        {(formik: FormikProps<FormikValues>) => {
          const handleBack = () => {
            const updatedValues = [...pageValues];
            updatedValues[activePage] = formik.values;
            setPageValues(updatedValues);

            if (!isFirstPage) {
              const prevPage = activePage - 1;
              setActivePage(prevPage);
              formik.resetForm({ values: updatedValues[prevPage] });
            }
          };

          const handleNext = async () => {
            const errors = await formik.validateForm();

            if (Object.keys(errors).length > 0) {
              formik.setTouched(
                  Object.keys(formik.values).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                  }, {} as Record<string, boolean>)
              );
              return;
            }

            const updatedValues = [...pageValues];
            updatedValues[activePage] = formik.values;
            setPageValues(updatedValues);

            if (!isLastPage) {
              const nextPage = activePage + 1;
              setActivePage(nextPage);
              formik.resetForm({ values: updatedValues[nextPage] });
            }
          };

          const handleSave = async () => {
            const errors = await formik.validateForm();

            if (Object.keys(errors).length > 0) {
              formik.setTouched(
                  Object.keys(formik.values).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                  }, {} as Record<string, boolean>)
              );
              return;
            }

            const updatedValues = [...pageValues];
            updatedValues[activePage] = formik.values;
            setPageValues(updatedValues);

            onSubmit(updatedValues);
          };

          const childContent = currentPage.props.children;

          return (
              <Card>
                <CardHeader>
                  <h4 className="mb-0">{title}</h4>
                </CardHeader>

                <CardBody>
                  <Form>
                    <h5 className="mb-3">{currentPage.props.title}</h5>
                    <div className="mb-4">{childContent}</div>

                    <Row>
                      <Col xs="auto">
                        <NPCancelButton text="Отмена" onClick={onCancel} />
                      </Col>

                      <Col xs="auto">
                        <NPCancelButton
                            text="Назад"
                            onClick={handleBack}
                            disabled={isFirstPage}
                        />
                      </Col>

                      <Col xs="auto">
                        <NPSubmitButton
                            text={isLastPage ? 'Сохранить' : 'Далее'}
                            onClick={isLastPage ? handleSave : handleNext}
                            isSubmitting={formik.isSubmitting}
                        />
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
          );
        }}
      </Formik>
  );
};
