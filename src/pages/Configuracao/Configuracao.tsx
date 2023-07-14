import Card from '../../components/Card';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import ListaParticipantes from '../../components/ListaParticipantes/ListaParticipantes';

export default function Configuracao() {
  return (
    <Card>
      <section>
        <h2>Vamos começar!</h2>
        <Formulario />
        <ListaParticipantes />
        <Footer />
      </section>
    </Card>
  );
}
