import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import Footer from './Footer';

jest.mock('../../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  };
});

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('../../state/hook/useSorteio', () => {
  return {
    useSorteio: () => mockSorteio
  };
});

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  };
});

describe('Quando não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');

    expect(botao).toBeDisabled();
  });
});

describe('Quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'João', 'Maria']);
  });

  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');

    expect(botao).not.toBeDisabled();
  });

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    fireEvent.click(botao);

    expect(mockNavegacao).toHaveBeenCalledTimes(1);
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
    expect(mockSorteio).toHaveBeenCalledTimes(1);
  });
});
