import { Cascader } from "antd";
import "./styles.css";
import { useField, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "redux/product";

const FormikCascader = ({ ...props }) => {
  const { label, options, ...rest } = props;
  const [, , helpers] = useField(props);
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.product);
  return (
    <section className="formik-cascader">
      <Field name={rest.name}>
        {() => (
          <>
            <Cascader
              size="large"
              options={options}
              onChange={(value, data) => {
                helpers.setValue(value[value.length - 1]);
                dispatch(setSelectedCategory(data[data.length - 1]));
              }}
              placeholder={label}
              defaultValue={selectedCategory.label}
              {...rest}
            />
          </>
        )}
      </Field>
    </section>
  );
};

export default FormikCascader;
