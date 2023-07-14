import { useNavigate } from 'react-router-dom';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import './Footer.css';
import { useSorteio } from '../../state/hook/useSorteio';

export default function Footer() {
  const participantes = useListaDeParticipantes();

  const navegarPara = useNavigate();
  const sortear = useSorteio();

  function iniciar() {
    sortear();
    navegarPara('/sorteio');
  }

  return (
    <footer className="rodape-configuracoes">
      <button className="botao" disabled={participantes.length < 3} onClick={iniciar}>
        Iniciar brincadeira
      </button>
      <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
    </footer>
  );
}
