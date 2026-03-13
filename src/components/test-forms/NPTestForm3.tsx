import { ErrorMessage, Field, FormikValues, useFormikContext } from 'formik';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

interface NPTestFormProps {
  isEdit?: boolean;
  isReadOnly?: boolean;
}

export const NPTestForm3 = ({
  isEdit = true,
  isReadOnly = false,
}: NPTestFormProps) => {
  const formik = useFormikContext<FormikValues>();
  const disabled = isReadOnly || !isEdit;

  return (
      <FormGroup>
        <Label for="email">Электронная почта</Label>

        <Field
            as="input"
            id="email"
            name="email"
            type="text"
            disabled={disabled}
            className={`form-control ${
                formik.touched.email && formik.errors.email ? 'is-invalid' : ''
            }`}
        />

        <ErrorMessage name="email">
          {(msg) => <FormFeedback className="d-block">{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
  );
};
