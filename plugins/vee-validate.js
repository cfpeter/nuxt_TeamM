import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

// install the 'required' rule.
extend("required", {
  ...required,
  message: 'The {_field_} is required'
});