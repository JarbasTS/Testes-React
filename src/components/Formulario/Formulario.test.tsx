import { act, fireEvent, render, screen } from '@testing-library/react';
import Formulario from './Formulario';
import { RecoilRoot } from 'recoil';

describe('O comportamento do Formulario.tsx', () => {
  test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    // renderizar o componente
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    // encontrar o botão
    const botao = screen.getByRole('button');

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();
    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test('adicionar um participante caso exista um nome preechido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    const botao = screen.getByRole('button');

    // digitar um nome no input
    fireEvent.change(input, {
      target: {
        value: 'Zé da Gata'
      }
    });

    // clicar no botão de submeter
    fireEvent.click(botao);

    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();

    // garantir que o input não tenha um valor
    expect(input).toHaveValue('');
  });

  test('nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    const botao = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'Zé da Gata'
      }
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'Zé da Gata'
      }
    });

    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole('alert');

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados já existentes não são permitidos!');
  });

  test('a mensagem de erro deve sumir após o timer', () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    const botao = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'Zé da Gata'
      }
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'Zé da Gata'
      }
    });

    fireEvent.click(botao);
    let mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeInTheDocument();

    // esperar N segundos
    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeNull();
  });
});
