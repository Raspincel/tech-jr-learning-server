import * as yup from 'yup'

export const RegisterSchema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required().positive().test(
      "is-decimal",
      "The price should be a decimal with maximum two digits after comma",
      (val: any) => {
          return /^\d+(\.\d{0,2})?$/.test(val);
      }
    ).required()
})