import { sorteador } from './sorteador';

describe('dado um sorteio de amigos secretos', () => {
  test('cada participante não sorteie o proprio nome', () => {
    const participantes = ['João', 'Maria', 'José', 'Pedro', 'Ana', 'Paulo'];

    const sorteio = sorteador(participantes);
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});
