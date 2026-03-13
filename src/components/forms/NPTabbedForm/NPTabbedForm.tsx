import React, { ReactElement, ReactNode, useMemo, useState } from 'react';
import { Formik, Form, FormikHelpers, FormikProps, FormikValues } from 'formik';
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import { NPCancelButton, NPSubmitButton } from '../../index';
import { NPTabPaneChildProps, NPTabPaneProps } from '../../index';

interface NPTabbedFormProps {
  isReadOnly?: boolean;
  isEdit?: boolean;
  onSubmit: (values: FormikValues[]) => void;
  onCancel: () => void;
  title: string;
  children: ReactNode;
}

export const NPTabbedForm: React.FC<NPTabbedFormProps> = ({
  isReadOnly = false,
  isEdit = false,
  onSubmit,
  onCancel,
  title,
  children,
}) => {
  const tabs = React.Children.toArray(children) as ReactElement<NPTabPaneProps>[];

  const initialEditMode = useMemo(() => {
    if (isReadOnly) return false;
    return isEdit;
  }, [isReadOnly, isEdit]);

  const [editMode, setEditMode] = useState(initialEditMode);
  const [activeTab, setActiveTab] = useState(0);

  const [tabValues, setTabValues] = useState<FormikValues[]>(
      tabs.map((tab) => tab.props.initialValues)
  );

  const currentTab = tabs[activeTab];
  const actualEditMode = isReadOnly ? false : editMode;

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
      <Formik
          enableReinitialize
          initialValues={tabValues[activeTab]}
          validationSchema={currentTab.props.validationSchema}
          onSubmit={(values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
            const updatedValues = [...tabValues];
            updatedValues[activeTab] = values;
            setTabValues(updatedValues);

            onSubmit(updatedValues);
            helpers.setSubmitting(false);
          }}
      >
        {(formik: FormikProps<FormikValues>) => {
          const handleCancel = () => {
            const resetValues = tabs.map((tab) => tab.props.initialValues);
            setTabValues(resetValues);
            formik.resetForm({ values: resetValues[activeTab] });

            if (!isReadOnly && !isEdit) {
              setEditMode(false);
            }

            onCancel();
          };

          const handleTabChange = async (newTabIndex: number) => {
            if (newTabIndex === activeTab) return;

            if (actualEditMode) {
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

              const updatedValues = [...tabValues];
              updatedValues[activeTab] = formik.values;
              setTabValues(updatedValues);

              setActiveTab(newTabIndex);
              formik.resetForm({ values: updatedValues[newTabIndex] });
              return;
            }

            setActiveTab(newTabIndex);
            formik.resetForm({ values: tabValues[newTabIndex] });
          };

          const handleSubmitClick = async () => {
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

            const updatedValues = [...tabValues];
            updatedValues[activeTab] = formik.values;
            setTabValues(updatedValues);

            onSubmit(updatedValues);
          };

          const childWithProps = React.isValidElement(currentTab.props.children)
              ? React.cloneElement(
                  currentTab.props.children as ReactElement<NPTabPaneChildProps>,
                  {
                    isEdit: actualEditMode,
                    isReadOnly,
                  }
              )
              : currentTab.props.children;

          return (
              <Card>
                <CardHeader>
                  <h4 className="mb-3">{title}</h4>

                  <Nav tabs>
                    {tabs.map((tab, index) => (
                        <NavItem key={index}>
                          <NavLink
                              href="#"
                              active={activeTab === index}
                              onClick={(e) => {
                                e.preventDefault();
                                handleTabChange(index);
                              }}
                              style={{ cursor: 'pointer' }}
                          >
                            {tab.props.title}
                          </NavLink>
                        </NavItem>
                    ))}
                  </Nav>
                </CardHeader>

                <CardBody>
                  <Form>
                    <h5 className="mb-3">{currentTab.props.title}</h5>

                    <div className="mb-4">{childWithProps}</div>

                    <Row>
                      <Col xs="auto">
                        <NPCancelButton text="Отмена" onClick={handleCancel} />
                      </Col>

                      {!isReadOnly && (
                          <Col xs="auto">
                            <NPSubmitButton
                                text={actualEditMode ? 'Сохранить' : 'Изменить'}
                                onClick={!actualEditMode ? handleEditClick : handleSubmitClick}
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
