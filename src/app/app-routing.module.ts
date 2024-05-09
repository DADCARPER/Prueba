import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { CptComponent } from './pages/cpt/cpt.component';
import { InformeComponent } from './pages/informe/informe.component';
import { SalirComponent } from './pages/salir/salir.component';


const routes: Routes = [

  {
    path: '', redirectTo:'login', pathMatch:'full'
  },
  // {
  //   path: 'inicio',
  //   loadChildren:() => import('../app/pages/inicio/inicio.module').then(m => m.InicioModule)
  // },
  // {
  //   path: 'resultados',
  //   loadChildren:() => import('../app/pages/resultados/resultados.module').then(m => m.ResultadosModule)
  // },
  // {
  //   path: 'test-cpt',
  //   loadChildren:() => import('../app/pages/test-cpt/test-cpt.module').then(m => m.TestCptModule)
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'ctp',
    component: CptComponent
  },
  {
    path: 'pacientes',
    component: PacientesComponent
  },
  {
    path: 'informe',
    component: InformeComponent
  },
  {
    path: 'salir',
    component: SalirComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [LoginComponent,PacientesComponent,DashboardComponent,NuevoComponent,CptComponent,InformeComponent,SalirComponent]