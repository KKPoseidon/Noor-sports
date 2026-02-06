import { createBrowserRouter } from 'react-router';
import { Layout } from '@/app/components/Layout';
import { Home } from '@/app/pages/Home';
import { Programs } from '@/app/pages/Programs';
import { ProgramDetail } from '@/app/pages/ProgramDetail';
import { Fall2025 } from '@/app/pages/Fall2025';
import { About } from '@/app/pages/About';
import { Contact } from '@/app/pages/Contact';
import { Register } from '@/app/pages/Register';
import { NotFound } from '@/app/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'programs', Component: Programs },
      { path: 'programs/fall-2025', Component: Fall2025 },
      { path: 'programs/:programId', Component: ProgramDetail },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: 'register', Component: Register },
      { path: '*', Component: NotFound },
    ],
  },
]);