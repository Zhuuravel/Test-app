import { ErrorMessage, Field, FormikValues, useFormikContext } from 'formik';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

interface NPTestFormProps {
  isEdit?: boolean;
  isReadOnly?: boolean;
}

export const NPTestForm1 = ({
  isEdit = true,
  isReadOnly = false,
}: NPTestFormProps) => {
  const formik = useFormikContext<FormikValues>();
  const disabled = isReadOnly || !isEdit;

  return (
      <FormGroup>
        <Label for="firstName">Имя</Label>

        <Field
            as="input"
            id="firstName"
            name="firstName"
            type="text"
            disabled={disabled}
            className={`form-control ${
                formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''
            }`}
        />

        <ErrorMessage name="firstName">
          {(msg) => <FormFeedback className="d-block">{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
  );
};
