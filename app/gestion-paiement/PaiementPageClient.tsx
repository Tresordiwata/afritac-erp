import { Dashboard } from './components/dashboard';
import InvoiceList from './components/invoice-list';
import { InvoiceForm } from './components/invoice-form';
import { InvoicePreview } from './components/invoice-preview';
import LayoutSecond from '@/layouts/LayoutSecond';

export default function Home() {
  return (
    <LayoutSecond titre={"Gestion des Factures"}>
<div>
      <Dashboard />
      
      <div className="grid md:grid-cols-2 gap-8 mt-3">
        <InvoiceForm />
        <InvoicePreview />
      </div>
      
      <InvoiceList />
      </div>
    </LayoutSecond>
  );
}