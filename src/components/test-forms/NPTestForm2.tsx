import { ErrorMessage, Field, FormikValues, useFormikContext } from 'formik';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

interface NPTestFormProps {
  isEdit?: boolean;
  isReadOnly?: boolean;
}

export const NPTestForm2 = ({
  isEdit = true,
  isReadOnly = false,
}: NPTestFormProps) => {
  const formik = useFormikContext<FormikValues>();
  const disabled = isReadOnly || !isEdit;

  return (
      <FormGroup>
        <Label for="lastName">Фамилия</Label>

        <Field
            as="input"
            id="lastName"
            name="lastName"
            type="text"
            disabled={disabled}
            className={`form-control ${
                formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''
            }`}
        />

        <ErrorMessage name="lastName">
          {(msg) => <FormFeedback className="d-block">{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
  );
};
