import { DICT_NAME_CAPTCHA } from './dict-name';

const revisedDictFields = [
  {
    name: DICT_NAME_CAPTCHA,
    regex: '/^(?=.*[0-9])/g',
    length: 6
  }
]

export default revisedDictFields;
