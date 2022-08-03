
import { FormHTMLAttributes } from 'react';

import * as S from './styles';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <S.Container onSubmit={onSubmit}>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default Form;