import * as Yup from 'yup';
import { NPSimpleForm } from '../components';
import { NPTestForm1 } from '../components/test-forms/';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Поле "Имя" обязательно'),
});

export const SimpleFormPage = () => {
  return (
      <NPSimpleForm
          title="Простая форма"
          isReadOnly={false}
          isEdit={false}
          initialValues={{ firstName: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values.firstName);
          }}
          onCancel={() => {
            console.log('onCancel');
          }}
      >
        <NPTestForm1 />
      </NPSimpleForm>
  );
};
