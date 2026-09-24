import { Globe, X, CircleCheck } from 'lucide-react';

/** Diálogo "Publicar funil / Publicar página", reproduzido da captura real. */
export function PublishDialog({ kind = 'funil', slug = 'diagnostico-de-pele-lumen-skin', domain = 'app.quizmaker.com.br/' }: { kind?: 'funil' | 'página'; slug?: string; domain?: string }) {
  return (
    <div className="pub" data-publish-dialog>
      <div className="pub__dlg" style={{ width: 448, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 700 }}><Globe size={18} /> Publicar {kind}</div>
          <X size={16} color="#6b7280" />
        </div>
        <p>Personalize a URL {kind === 'funil' ? 'do seu funil' : 'da sua página'} antes de publicar.</p>
        <div style={{ fontSize: 13, fontWeight: 500 }}>URL personalizada</div>
        <div style={{ marginTop: 8, display: 'flex', border: '2px solid #6b26d9', borderRadius: 8, overflow: 'hidden', height: 42 }}>
          <span style={{ background: '#f4f4f5', color: '#6b7280', fontSize: 13, display: 'flex', alignItems: 'center', padding: '0 12px', borderRight: '1px solid #e5e7eb' }} data-pub-domain>{domain}</span>
          <span style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden' }} data-pub-slug>{slug}</span>
          <span style={{ display: 'flex', alignItems: 'center', padding: '0 10px', color: '#16a34a' }}><CircleCheck size={16} /></span>
        </div>
        <div style={{ color: '#16a34a', fontSize: 12, marginTop: 6 }}>Disponível!</div>
        <div className="pub__foot">
          <span className="sbtn sbtn--outline">Cancelar</span>
          <span className="sbtn sbtn--primary" data-pub-confirm><Globe /> Publicar</span>
        </div>
      </div>
    </div>
  );
}
