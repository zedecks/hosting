// Type declarations for React and JSX in standalone components
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export = React;
}

declare namespace React {
  type ReactNode = any;
  type FC<P = {}> = (props: P) => any;
  interface HTMLAttributes<T> {
    [key: string]: any;
  }
  interface KeyboardEvent {
    key: string;
    preventDefault: () => void;
  }
  function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  function useMemo<T>(factory: () => T, deps: any[] | undefined): T;
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  function useRef<T>(initialValue: T): { current: T };
}

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
}

declare module 'lucide-react' {
  export const Plus: any;
}

declare module '@/lib/utils' {
  export function cn(...inputs: any[]): string;
}
