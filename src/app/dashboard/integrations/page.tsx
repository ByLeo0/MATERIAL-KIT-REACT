import type { Metadata } from 'next';
import { config } from '@/config';
import ProductsPage from './products-page'; 
import { IntegrationCard } from '@/components/dashboard/integrations/integrations-card';


export const metadata: Metadata = {
  title: `Productos | Dashboard | ${config.site.name}`,
};

export default function Page() {
  return <ProductsPage />;
}

