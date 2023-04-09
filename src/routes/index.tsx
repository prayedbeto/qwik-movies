import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

import { QwikLogo } from '~/components/starter/icons/qwik';

export default component$(() => {
  return (
    <section>
      <h1>Tus peliculas con</h1>
      <QwikLogo/>
      <Link class="link" href="/movies" title="Ir a las pelis">Ver las pelis</Link>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
