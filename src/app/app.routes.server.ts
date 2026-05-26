import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productdetails/:id',
    renderMode: RenderMode.Client // <-- Add this exact line
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
