import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';

export default function ListaParticipantes() {
  const participantes: string[] = useListaDeParticipantes();
  return (
    <ul>
      {participantes.map(participantes => (
        <li key={participantes}>{participantes}</li>
      ))}
    </ul>
  );
}
