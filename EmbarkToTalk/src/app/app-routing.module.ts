import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'talk',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./components/footer/footer.module').then( m => m.FooterPageModule)
  },

  {
    path: 'talk',
    loadChildren: () => import('./talk/talk.module').then( m => m.TalkPageModule)
  },
  {
    path: 'japanese',
    loadChildren: () => import('./lessons/japanese/japanese.module').then( m => m.JapanesePageModule)
  },
  {
    path: 'english',
    loadChildren: () => import('./lessons/english/english.module').then( m => m.EnglishPageModule)
  },
  {
    path: 'spanish',
    loadChildren: () => import('./lessons/spanish/spanish.module').then( m => m.SpanishPageModule)
  },
  {
    path: 'shadowread',
    loadChildren: () => import('./lessons/shadowread/shadowread.module').then( m => m.ShadowreadPageModule)
  },

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
