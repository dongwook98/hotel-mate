import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import globalStyles from '@styles/globalStyles.ts';
import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // 네트워크 요청 실패시 다시 요청 X
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Emotion 글로벌 스타일 적용 */}
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
