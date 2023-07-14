import { useState } from 'react';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import { useResultado } from '../../state/hook/useResultado';
import './Sorteio.css';
import Card from '../../components/Card';

export default function Sorteio() {
  const participantes = useListaDeParticipantes();

  const [participanteDaVez, setParticipanteDaVez] = useState('');
  const [amigoSecreto, setAmigoSecreto] = useState('');

  const resultado = useResultado();

  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!);
      setTimeout(() => {
        setAmigoSecreto('');
      }, 5000);
    }
  };

  return (
    <Card>
      <section className="sorteio">
        <form onSubmit={sortear}>
          <select
            required
            name="participanteDaVez"
            id="participanteDaVez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value)}
          >
            <option>Selecione seu nome</option>
            {participantes.map(participantes => (
              <option key={participantes}>{participantes}</option>
            ))}
          </select>
          <button className="botao-sortear">Sortear</button>
        </form>
        {amigoSecreto && (
          <p className="resultado" role="alert">
            Amigo secreto: {amigoSecreto}
          </p>
        )}
        <footer className="sorteio">
          <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
        </footer>
      </section>
    </Card>
  );
}
