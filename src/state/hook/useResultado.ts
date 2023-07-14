import { useRecoilValue } from 'recoil';
import { resultadoAmigoSecreto } from '../atom';

export const useResultado = () => {
  return useRecoilValue(resultadoAmigoSecreto);
};
