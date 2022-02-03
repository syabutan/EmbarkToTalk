import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'spanish',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'talk',
    loadChildren: () => import('./talk/talk.module').then( m => m.TalkPageModule)
  },
  {
    path: 'spanish',
    loadChildren: () => import('./lessons/spanish/spanish.module').then( m => m.SpanishPageModule)
  },
  {
    path: 'japanese',
    loadChildren: () => import('./lessons/japanese/japanese.module').then( m => m.JapanesePageModule)
  },
  {
    path: 'shadowread',
    loadChildren: () => import('./lessons/shadow/shadow.module').then( m => m.ShadowPageModule)
  },
  {
    path: 's',
    loadChildren: () => import('./lessons/shadowread/shadowread.module').then( m => m.ShadowreadPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
