import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './features/providers/AuthProvider.tsx'
import { ThemeProvider } from './features/providers/ThemeProvider.tsx'
import { ToastProvider } from './features/providers/ToastProvider.tsx'
import { ConfirmProvider } from './features/providers/ConfirmProvider.tsx'
import { router } from './features/router/router.tsx'
import { RouterProvider } from 'react-router-dom'
import ExchangeProvider from './features/providers/ExchangeProvider.tsx'
import ProductProvider from './features/providers/ProductProvider.tsx'
import CalculatorProvider from './features/providers/CalculatorProvider.tsx'
import GeminiProvider from './features/providers/GeminiProvider.tsx'
import SettingProvider from './features/providers/SettingProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingProvider>
      <ThemeProvider>
        <ConfirmProvider>
          <ToastProvider>
            <AuthProvider>
              <ExchangeProvider>
                <ProductProvider>
                  <CalculatorProvider>
                    <GeminiProvider>

                      <RouterProvider router={router} />

                    </GeminiProvider>
                  </CalculatorProvider>
                </ProductProvider>
              </ExchangeProvider>
            </AuthProvider>
          </ToastProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </SettingProvider>
  </StrictMode>
)
