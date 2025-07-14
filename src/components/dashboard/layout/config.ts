import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Panel del admin', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Proveedor', href: paths.dashboard.customers, icon: 'users' },
  { key: 'integrations', title: 'Productos', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  //{ key: 'account', title: 'Alertas', href: paths.dashboard.account, icon: 'users' },
  { key: 'settings', title: 'Configuración', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Perfil', href: paths.dashboard.account, icon: 'user' },

] satisfies NavItemConfig[];
