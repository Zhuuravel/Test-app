import * as Yup from 'yup';
import { NPWizard, NPWizardPage } from '../components';
import { NPTestForm1, NPTestForm2, NPTestForm3 } from '../components/test-forms';

const firstNameSchema = Yup.object({
  firstName: Yup.string().required('Поле "Имя" обязательно'),
});

const lastNameSchema = Yup.object({
  lastName: Yup.string().required('Поле "Фамилия" обязательно'),
});

const emailSchema = Yup.object({
  email: Yup.string().required('Поле "Электронная почта" обязательно'),
});

export const WizardFormPage = () => {
  return (
      <NPWizard
          title="Многостраничная форма (Wizard)"
          onSubmit={(valuesArray) => {
            console.log(valuesArray[0]?.firstName);
            console.log(valuesArray[1]?.lastName);
            console.log(valuesArray[2]?.email);
          }}
          onCancel={() => {
            console.log('onCancel');
          }}
      >
        <NPWizardPage
            title="NPTestForm1"
            initialValues={{ firstName: '' }}
            validationSchema={firstNameSchema}
        >
          <NPTestForm1 />
        </NPWizardPage>

        <NPWizardPage
            title="NPTestForm2"
            initialValues={{ lastName: '' }}
            validationSchema={lastNameSchema}
        >
          <NPTestForm2 />
        </NPWizardPage>

        <NPWizardPage
            title="NPTestForm3"
            initialValues={{ email: '' }}
            validationSchema={emailSchema}
        >
          <NPTestForm3 />
        </NPWizardPage>
      </NPWizard>
  );
};
