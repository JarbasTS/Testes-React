import { act, fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import Sorteio from './Sorteio';
import { useResultado } from '../../state/hook/useResultado';

jest.mock('../../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  };
});
jest.mock('../../state/hook/useResultado', () => {
  return {
    useResultado: jest.fn()
  };
});

describe('Na pagina de sorteio', () => {
  const participantes = ['Ana', 'Maria', 'João'];
  const resultado = new Map([
    ['Ana', 'Maria'],
    ['Maria', 'João'],
    ['João', 'Ana']
  ]);
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultado as jest.Mock).mockReturnValue(resultado);
  });

  test('todos os participantes podem exibir o seu amigo secreto', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.getAllByRole('option');
    expect(opcoes).toHaveLength(participantes.length + 1);
  });

  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText('Selecione o seu nome');
    fireEvent.change(select, { target: { value: participantes[0] } });

    const botao = screen.getByRole('button');
    fireEvent.click(botao);
    const amigoSecreto = screen.getByRole('alert');

    expect(amigoSecreto).toBeInTheDocument();
  });

  test('esconde o amigo secreto sorteado depois de 5 segundos', async () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText('Selecione o seu nome');
    fireEvent.change(select, { target: { value: participantes[0] } });

    const button = screen.getByRole('button');
    fireEvent.click(button);
    act(() => {
      jest.runAllTimers();
    });
    const alerta = screen.queryByRole('alert');
    expect(alerta).not.toBeInTheDocument();
  });
});
