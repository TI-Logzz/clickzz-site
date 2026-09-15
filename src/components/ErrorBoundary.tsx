import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; name?: string }
interface State { error: Error | null }

/**
 * Isola falhas: um erro na cena 3D ou em uma seção não derruba a página inteira.
 * Em vez de tela branca, a parte com problema some (ou mostra o fallback) e o erro fica registrado.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[Clickzz] erro em ${this.props.name ?? 'componente'}:`, error, info.componentStack);
    const w = window as Window & { __czzReport?: (m: string) => void };
    w.__czzReport?.(`${this.props.name ?? 'componente'}: ${error.message}`);
  }
  render() {
    if (this.state.error) return this.props.fallback ?? null;
    return this.props.children;
  }
}
