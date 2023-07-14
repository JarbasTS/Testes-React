import { useListaDeParticipantes } from './useListaDeParticipantes';
import { resultadoAmigoSecreto } from '../atom';
import { useSetRecoilState } from 'recoil';
import { sorteador } from '../helpers/sorteador';

export const useSorteio = () => {
  const participantes = useListaDeParticipantes();
  const setResultado = useSetRecoilState(resultadoAmigoSecreto);
  return () => {
    const resultado = sorteador(participantes);
    setResultado(resultado);
  };
};
