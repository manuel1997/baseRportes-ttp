import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { UserIdleModule } from 'angular-user-idle';
import { RecaptchaModule } from 'ng-recaptcha';

//Guard
import { AuthGuard } from './guard/auth.guard';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';

//Reportes Globales Agrupados
import { ResumenesperaComponent } from './componentes/repoagr/resumenespera/resumenespera.component';
import { ResumenatencionComponent } from './componentes/repoagr/resumenatencion/resumenatencion.component';
import { ResumenesperaReporteComponent } from './componentes/repoagr/resumenespera/resumenespera-componentes/resumenespera-reporte/resumenespera-reporte.component';
import { ResumenatencionReporteComponent } from './componentes/repoagr/resumenatencion/resumenatencion-componentes/resumenatencion-reporte/resumenatencion-reporte.component';
import { ParametrosComponent } from './componentes/repoagr/parametros/parametros.component';

//Reportes Globales no Agrupados
import { RangoesperaComponent } from './componentes/reponoagr/rangoespera/rangoespera.component';
import { RangoatencionComponent } from './componentes/reponoagr/rangoatencion/rangoatencion.component';
import { TendenciadeatencionComponent } from './componentes/reponoagr/tendenciadeatencion/tendenciadeatencion.component';
import { CargatrabajoComponent } from './componentes/reponoagr/cargatrabajo/cargatrabajo.component';
import { ResumenmensualComponent } from './componentes/reponoagr/resumenmensual/resumenmensual.component';
import { RankingdeatencionesComponent } from './componentes/reponoagr/rankingdeatenciones/rankingdeatenciones.component';
import { ResumentolComponent } from './componentes/reponoagr/resumentol/resumentol.component';
import { ResumenatencionoagrComponent } from './componentes/reponoagr/resumenatencionoagr/resumenatencionoagr.component';
import { ResumenesperanoagrComponent } from './componentes/reponoagr/resumenesperanoagr/resumenesperanoagr.component';

//Resultados ReporteGlobales no Agrupados
import { CargatrabajoFormComponent } from './componentes/reponoagr/cargatrabajo/cargatrabajo-componentes/cargatrabajo-form/cargatrabajo-form.component';
import { CargatrabajoReporteComponent } from './componentes/reponoagr/cargatrabajo/cargatrabajo-componentes/cargatrabajo-reporte/cargatrabajo-reporte.component';
import { RangoatencionReporteComponent } from './componentes/reponoagr/rangoatencion/rangoatencion-componentes/rangoatencion-reporte/rangoatencion-reporte.component';
import { RangoatencionFormComponent } from './componentes/reponoagr/rangoatencion/rangoatencion-componentes/rangoatencion-form/rangoatencion-form.component';
import { RangoesperaFormComponent } from './componentes/reponoagr/rangoespera/rangoespera-componentes/rangoespera-form/rangoespera-form.component';
import { RangoesperaReporteComponent } from './componentes/reponoagr/rangoespera/rangoespera-componentes/rangoespera-reporte/rangoespera-reporte.component';
import { RankingdeatencionesFormComponent } from './componentes/reponoagr/rankingdeatenciones/rankingdeatenciones-componentes/rankingdeatenciones-form/rankingdeatenciones-form.component';
import { RankingdeatencionesReporteComponent } from './componentes/reponoagr/rankingdeatenciones/rankingdeatenciones-componentes/rankingdeatenciones-reporte/rankingdeatenciones-reporte.component';
import { ResumenmensualReporteComponent } from './componentes/reponoagr/resumenmensual/resumenmensual-componentes/resumenmensual-reporte/resumenmensual-reporte.component';
import { ResumenmensualFormComponent } from './componentes/reponoagr/resumenmensual/resumenmensual-componentes/resumenmensual-form/resumenmensual-form.component';
import { ResumentolFormComponent } from './componentes/reponoagr/resumentol/resumentol-componentes/resumentol-form/resumentol-form.component';
import { ResumentolReporteComponent } from './componentes/reponoagr/resumentol/resumentol-componentes/resumentol-reporte/resumentol-reporte.component';
import { ResumenatencionoagrReporteComponent } from './componentes/reponoagr/resumenatencionoagr/resumenatencionoagr-componentes/resumenatencionoagr-reporte/resumenatencionoagr-reporte.component';
import { ResumenatencionoagrFormComponent } from './componentes/reponoagr/resumenatencionoagr/resumenatencionoagr-componentes/resumenatencionoagr-form/resumenatencionoagr-form.component';
import { ResumenesperanoagrReporteComponent } from './componentes/reponoagr/resumenesperanoagr/resumenesperanoagr-componentes/resumenesperanoagr-reporte/resumenesperanoagr-reporte.component';
import { TendenciaAtencionFormComponent } from './componentes/reponoagr/tendenciadeatencion/tendencia-atencion-componentes/tendencia-atencion-form/tendencia-atencion-form.component';
import { TendenciaAtencionReporteComponent } from './componentes/reponoagr/tendenciadeatencion/tendencia-atencion-componentes/tendencia-atencion-reporte/tendencia-atencion-reporte.component';
import { ResumenesperanoagrFormComponent } from './componentes/reponoagr/resumenesperanoagr/resumenesperanoagr-componentes/resumenesperanoagr-form/resumenesperanoagr-form.component';


//Graficas ReporteGlobales no Agrupados
import { TendenciaDeAtencionGraficosComponent } from './componentes/reponoagr/tendenciadeatencion/tendencia-atencion-componentes/tendencia-de-atencion-graficos/tendencia-de-atencion-graficos.component';
import { ResumenesperanoagrGraficosComponent } from './componentes/reponoagr/resumenesperanoagr/resumenesperanoagr-componentes/resumenesperanoagr-graficos/resumenesperanoagr-graficos.component';
import { ResumenatencionoagrGraficosComponent } from './componentes/reponoagr/resumenatencionoagr/resumenatencionoagr-componentes/resumenatencionoagr-graficos/resumenatencionoagr-graficos.component';
import { RankingdeatencionesGraficosComponent } from './componentes/reponoagr/rankingdeatenciones/rankingdeatenciones-componentes/rankingdeatenciones-graficos/rankingdeatenciones-graficos.component';

//Porcentuaje ReporteGlobales No Agrupados
import { TendenciaAtencionPorcentuajeComponent } from './componentes/reponoagr/tendenciadeatencion/tendencia-atencion-componentes/tendencia-atencion-porcentuaje/tendencia-atencion-porcentuaje.component';
import { ResumenesperanoagrPorcentuajeComponent } from './componentes/reponoagr/resumenesperanoagr/resumenesperanoagr-componentes/resumenesperanoagr-porcentuaje/resumenesperanoagr-porcentuaje.component';
import { ResumenatencionoagrPorcentuajeComponent } from './componentes/reponoagr/resumenatencionoagr/resumenatencionoagr-componentes/resumenatencionoagr-porcentuaje/resumenatencionoagr-porcentuaje.component';
import { RankingdeatencionesPorcentuajeComponent } from './componentes/reponoagr/rankingdeatenciones/rankingdeatenciones-componentes/rankingdeatenciones-porcentuaje/rankingdeatenciones-porcentuaje.component';


//Reportes Por Serie
import { ProduccionComponent } from './componentes/reportePorSerie/produccion/produccion.component';
import { RankingDeEjecutivosComponent } from './componentes/reportePorSerie/ranking-de-ejecutivos/ranking-de-ejecutivos.component';
import { ProduccionFormComponent } from './componentes/reportePorSerie/produccion/produccion-componentes/produccion-form/produccion-form.component';
import { ProduccionReporteComponent } from './componentes/reportePorSerie/produccion/produccion-componentes/produccion-reporte/produccion-reporte.component';
import { RankingDeEjecutivosReporteComponent } from './componentes/reportePorSerie/ranking-de-ejecutivos/ranking-de-ejecutivos-componentes/ranking-de-ejecutivos-reporte/ranking-de-ejecutivos-reporte.component';
import { RankingDeEjecutivosFormComponent } from './componentes/reportePorSerie/ranking-de-ejecutivos/ranking-de-ejecutivos-componentes/ranking-de-ejecutivos-form/ranking-de-ejecutivos-form.component';
import { ProduccionTablaComponent } from './componentes/reportePorSerie/produccion/produccion-componentes/produccion-tabla/produccion-tabla.component';
import { RankingDeEjecutivosTablaComponent } from './componentes/reportePorSerie/ranking-de-ejecutivos/ranking-de-ejecutivos-componentes/ranking-de-ejecutivos-tabla/ranking-de-ejecutivos-tabla.component';


import { CargaDeTrabajoDiariaComponent } from './componentes/reportePorSerie/carga-de-trabajo-diaria/carga-de-trabajo-diaria.component';
import { CargaDeTrabajoDiariaTablaComponent } from './componentes/reportePorSerie/carga-de-trabajo-diaria/carga-de-trabajo-diaria-tabla/carga-de-trabajo-diaria-tabla.component';
import { CargaDeTrabajoDiariaFormComponent } from './componentes/reportePorSerie/carga-de-trabajo-diaria/carga-de-trabajo-diaria-form/carga-de-trabajo-diaria-form.component';
import { CargaDeTrabajoDiariaReporteComponent } from './componentes/reportePorSerie/carga-de-trabajo-diaria/carga-de-trabajo-diaria-reporte/carga-de-trabajo-diaria-reporte.component';
import { CargaDeTrabajoDiariaGraficoComponent } from './componentes/reportePorSerie/carga-de-trabajo-diaria/carga-de-trabajo-diaria-grafico/carga-de-trabajo-diaria-grafico.component';
import { ResumenDeOficinaComponent } from './componentes/reportePorSerie/resumen-de-oficina/resumen-de-oficina.component';
import { ResumenDeOficinaFormComponent } from './componentes/reportePorSerie/resumen-de-oficina/resumen-de-oficina-form/resumen-de-oficina-form.component';
import { ResumenDeOficinaTablaComponent } from './componentes/reportePorSerie/resumen-de-oficina/resumen-de-oficina-tabla/resumen-de-oficina-tabla.component';
import { ResumenDeOficinaReporteComponent } from './componentes/reportePorSerie/resumen-de-oficina/resumen-de-oficina-reporte/resumen-de-oficina-reporte.component';
import { MotivosDeAtencionComponent } from './componentes/reportePorSerie/motivos-de-atencion/motivos-de-atencion.component';
import { MotivosDeAtencionFormComponent } from './componentes/reportePorSerie/motivos-de-atencion/motivos-de-atencion-form/motivos-de-atencion-form.component';
import { MotivosDeAtencionTablaComponent } from './componentes/reportePorSerie/motivos-de-atencion/motivos-de-atencion-tabla/motivos-de-atencion-tabla.component';
import { MotivosDeAtencionReporteComponent } from './componentes/reportePorSerie/motivos-de-atencion/motivos-de-atencion-reporte/motivos-de-atencion-reporte.component';
import { MotivosDeAtencionGraficoComponent } from './componentes/reportePorSerie/motivos-de-atencion/motivos-de-atencion-grafico/motivos-de-atencion-grafico.component';

//Componentes Comunes
import { NavbarComponent } from './componentes/comun/navbar/navbar.component';
import { SidebarComponent } from './componentes/comun/sidebar/sidebar.component';
import { SeriesComponent } from './componentes/comun/series/series.component';
import { OficinasComponent } from './componentes/comun/oficinas/oficinas.component';
import { SerieRadioComponent } from './componentes/comun/serie-radio/serie-radio.component';
import { LoadingComponent } from './componentes/comun/loading/loading.component';

//Servicios
import { ApiTtpService } from './servicios/api-ttp.service';
import { ValidadorService } from './validador/validador.service';


//Reportes por oficina
import { MotivosDePausaComponent } from './componentes/reportesPorOficina/motivos-de-pausa/motivos-de-pausa.component';
import { MotivosDePausaFormComponent } from './componentes/reportesPorOficina/motivos-de-pausa/motivos-de-pausa-componentes/motivos-de-pausa-form/motivos-de-pausa-form.component';
import { MotivosDePausaTablaComponent } from './componentes/reportesPorOficina/motivos-de-pausa/motivos-de-pausa-componentes/motivos-de-pausa-tabla/motivos-de-pausa-tabla.component';
import { MotivosDePausaReporteComponent } from './componentes/reportesPorOficina/motivos-de-pausa/motivos-de-pausa-componentes/motivos-de-pausa-reporte/motivos-de-pausa-reporte.component';
import { MotivosDePausaGraficosComponent } from './componentes/reportesPorOficina/motivos-de-pausa/motivos-de-pausa-componentes/motivos-de-pausa-graficos/motivos-de-pausa-graficos.component';
import { ResumenDeEjecutivoComponent } from './componentes/reportesPorOficina/resumen-de-ejecutivo/resumen-de-ejecutivo.component';
import { ResumenDeEjecutivoTablaComponent } from './componentes/reportesPorOficina/resumen-de-ejecutivo/resumen-de-ejecutivo-componentes/resumen-de-ejecutivo-tabla/resumen-de-ejecutivo-tabla.component';
import { ResumenDeEjecutivoReporteComponent } from './componentes/reportesPorOficina/resumen-de-ejecutivo/resumen-de-ejecutivo-componentes/resumen-de-ejecutivo-reporte/resumen-de-ejecutivo-reporte.component';
import { ResumenDeEjecutivoFormComponent } from './componentes/reportesPorOficina/resumen-de-ejecutivo/resumen-de-ejecutivo-componentes/resumen-de-ejecutivo-form/resumen-de-ejecutivo-form.component';
import { EstadoDeEjecutivosComponent } from './componentes/reportesPorOficina/estado-de-ejecutivos/estado-de-ejecutivos.component';
import { EstadoDeEjecutivosFormComponent } from './componentes/reportesPorOficina/estado-de-ejecutivos/estado-de-ejecutivos-componentes/estado-de-ejecutivos-form/estado-de-ejecutivos-form.component';
import { EstadoDeEjecutivosTablaComponent } from './componentes/reportesPorOficina/estado-de-ejecutivos/estado-de-ejecutivos-componentes/estado-de-ejecutivos-tabla/estado-de-ejecutivos-tabla.component';
import { EstadoDeEjecutivosReporteComponent } from './componentes/reportesPorOficina/estado-de-ejecutivos/estado-de-ejecutivos-componentes/estado-de-ejecutivos-reporte/estado-de-ejecutivos-reporte.component';

//Reporte Online Oficina
import { ReportesOficinasComponent } from './componentes/reportes-oficinas/reportes-oficinas.component';
import { ReporteOficinaOnlineComponent } from './componentes/reporte-oficina-online/reporte-oficina-online.component';
import { OficinaStatusDetallesComponent } from './componentes/reporte-oficina-online/reporte-oficina-componentes/oficina-status-detalles/oficina-status-detalles.component';
import { OficinaStatusTablaComponent } from './componentes/reporte-oficina-online/reporte-oficina-componentes/oficina-status-tabla/oficina-status-tabla.component';
import { OficinaStatusFormComponent } from './componentes/reporte-oficina-online/reporte-oficina-componentes/oficina-status-form/oficina-status-form.component';
import { ZonasComponent } from './componentes/dashboard/zonas/zonas.component';
import { SucursalComponent } from './componentes/dashboard/sucursal/sucursal.component';
import { SucursalesComponent } from './componentes/dashboard/sucursales/sucursales.component';
import { ConversionSegundosPipe } from './pipes/conversion-segundos.pipe';
import { TruncarTextoPipe } from './pipes/truncar-texto.pipe';
import { ConvertirSegundosHoraPipe } from './pipes/convertir-segundos-hora.pipe';

// Vista Online
import { VistaToolbarComponent } from './componentes/dashboard/vistaonline/vista-toolbar/vista-toolbar.component';
import { VistaOnlineComponent } from './componentes/dashboard/vistaonline/vista-online/vista-online.component';
import { MotivosAtencionComponent } from './componentes/dashboard/vistaonline/motivos-atencion/motivos-atencion.component';
import { ReportesBatchComponent } from './componentes/reportes-batch/reportes-batch/reportes-batch.component';
import { ReportesBatchFormComponent } from './componentes/reportes-batch/reportes-batch-form/reportes-batch-form.component';
import { ReportesBatchListoComponent } from './componentes/reportes-batch/reportes-batch-listo/reportes-batch-listo.component';
import { ReportesBatchListadoComponent } from './componentes/reportes-batch/reportes-batch-listado/reportes-batch-listado.component';
import { ReportesBatchContenidoComponent } from './componentes/reportes-batch/reportes-batch-contenido/reportes-batch-contenido.component';
import { DashboardComponent } from './componentes/dashboard/dashboard/dashboard.component';


const routes: Route[] = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  // Batch
  {path: 'reportesBatch', component: ReportesBatchComponent, canActivate: [AuthGuard]},
  {path: 'reportesBatchForm', component: ReportesBatchFormComponent, canActivate: [AuthGuard]},
  {path: 'reportesBatchAviso', component: ReportesBatchListoComponent, canActivate: [AuthGuard]},
  {path: 'reportesBatchListado', component: ReportesBatchListadoComponent, canActivate: [AuthGuard]},
  {path: 'reportesBatchContenido', component: ReportesBatchContenidoComponent, canActivate: [AuthGuard]},
  // Agrupados
  {path: 'repAgrResumenEspera', component: ResumenesperaComponent, canActivate: [AuthGuard]},
  {path: 'repAgrResumenAtencion', component: ResumenatencionComponent, canActivate: [AuthGuard]},
  // No Agrupado
  {path: 'repnoagrRangoEspera', component: RangoesperaComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrRangoAtencion', component: RangoatencionComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrTendenciAtencion', component: TendenciadeatencionComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrCargaTrabajo', component: CargatrabajoComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrResumenEspera', component: ResumenesperanoagrComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrResumenAtencion', component: ResumenatencionoagrComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrResumenMensual', component: ResumenmensualComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrRankingAtenciones', component: RankingdeatencionesComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrResumenTOL', component: ResumentolComponent, canActivate: [AuthGuard]},

  /*{path: 'reporteNoAgrupado/TendenciaAtencionGrafico', component: TendenciaDeAtencionGraficosComponent, canActivate: [AuthGuard]},
  {path: 'reporteNoAgrupado/ResumenesperanoagrGrafico', component: ResumenesperanoagrGraficosComponent, canActivate: [AuthGuard]},
  {path: 'reporteNoAgrupado/ResumenatencionoagrGrafico', component: ResumenatencionoagrGraficosComponent, canActivate: [AuthGuard]},

  {path: 'reporteNoAgrupado/TendenciaAtencionPorcen', component: TendenciaAtencionPorcentuajeComponent, canActivate: [AuthGuard]},
  {path: 'reporteNoAgrupado/ResumenesperanoagrPorcen', component: ResumenesperanoagrPorcentuajeComponent, canActivate: [AuthGuard]},
  {path: 'reporteNoAgrupado/ResumenatencionoagrPorcen', component: ResumenatencionoagrPorcentuajeComponent, canActivate: [AuthGuard]},
  {path: 'reporteNoAgrupado/RankingdeatencionesPorcen', component: RankingdeatencionesPorcentuajeComponent, canActivate: [AuthGuard]},*/

  // Reportes Por Serie
  {path: 'reportePorSerieproduccion', component: ProduccionComponent, canActivate: [AuthGuard]},
  {path: 'reportePorSerierankingDeEjecutivos', component: RankingDeEjecutivosComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrResumenmensual', component: ResumenmensualComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrRankingatenciones', component: RankingdeatencionesComponent, canActivate: [AuthGuard]},
  {path: 'repnoagrResumentol', component: ResumentolComponent, canActivate: [AuthGuard]},

  {path: 'cargaDeTrabajoDiaria', component: CargaDeTrabajoDiariaComponent, canActivate: [AuthGuard]},
  {path: 'resumenDeOficina', component: ResumenDeOficinaComponent, canActivate: [AuthGuard]},
  {path: 'motivosDeAtencion', component: MotivosDeAtencionComponent, canActivate: [AuthGuard]},

  // Reportes por oficina
  {path: 'motivosDePausa', component: MotivosDePausaComponent, canActivate: [AuthGuard]},
  {path: 'resumenDeEjecutivo', component: ResumenDeEjecutivoComponent, canActivate: [AuthGuard]},
  {path: 'estadoDeEjecutivos', component: EstadoDeEjecutivosComponent, canActivate: [AuthGuard]},

  // Dashboard
  { path: 'dashboard_zonas', component: ZonasComponent, canActivate: [AuthGuard] },
  { path: 'dashboard_sucursales', component: SucursalesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard_sucursal', component: SucursalComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/sucursales/:id_zona', component: SucursalesComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/sucursal/:id_oficina', component: SucursalComponent, canActivate: [AuthGuard] },

  // Vista Online
  { path: 'vistaonline', component: VistaOnlineComponent, canActivate: [AuthGuard] },

  // Reporte Oficinas Online
  {path: 'oficinas', component: ReportesOficinasComponent, canActivate: [AuthGuard]},
  {path: 'oficinasReportes', component: ReporteOficinaOnlineComponent, canActivate: [AuthGuard]},
  {path: 'oficinasZonas', component: ZonasComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'login', pathMatch: 'full'}
  
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    ReportesComponent,
    ResumenesperaComponent,
    ResumenatencionComponent,
    RangoesperaComponent,
    RangoatencionComponent,
    NavbarComponent,
    SidebarComponent,
    SeriesComponent,
    OficinasComponent,
    ParametrosComponent,
    TendenciadeatencionComponent,
    CargatrabajoComponent,
    ResumenmensualComponent,
    RankingdeatencionesComponent,
    ResumentolComponent,
    ResumenatencionoagrComponent,
    ResumenesperanoagrComponent,
    TendenciaDeAtencionGraficosComponent,
    SerieRadioComponent,
    ProduccionComponent,
    RankingDeEjecutivosComponent,
    ResumenesperanoagrComponent,
    MotivosDePausaComponent,
    MotivosDePausaFormComponent,
    MotivosDePausaTablaComponent,
    MotivosDePausaReporteComponent,
    MotivosDePausaGraficosComponent,
    ResumenDeEjecutivoComponent,
    ResumenDeEjecutivoTablaComponent,
    ResumenDeEjecutivoReporteComponent,
    ResumenDeEjecutivoFormComponent,
    EstadoDeEjecutivosComponent,
    EstadoDeEjecutivosFormComponent,
    EstadoDeEjecutivosTablaComponent,
    EstadoDeEjecutivosReporteComponent,
    CargaDeTrabajoDiariaComponent,
    CargaDeTrabajoDiariaFormComponent,
    CargaDeTrabajoDiariaTablaComponent,
    CargaDeTrabajoDiariaReporteComponent,
    CargaDeTrabajoDiariaGraficoComponent,
    ResumenDeOficinaComponent,
    ResumenDeOficinaFormComponent,
    ResumenDeOficinaTablaComponent,
    ResumenDeOficinaReporteComponent,
    MotivosDeAtencionComponent,
    MotivosDeAtencionFormComponent,
    MotivosDeAtencionTablaComponent,
    MotivosDeAtencionReporteComponent,
    MotivosDeAtencionGraficoComponent,
    LoadingComponent,
    ResumenesperanoagrGraficosComponent,
    ResumenatencionoagrGraficosComponent,
    RankingdeatencionesGraficosComponent,
    TendenciaAtencionPorcentuajeComponent,
    ResumenesperanoagrPorcentuajeComponent,
    ResumenatencionoagrPorcentuajeComponent,
    RankingdeatencionesPorcentuajeComponent,
    ReporteOficinaOnlineComponent,
    OficinaStatusDetallesComponent,
    OficinaStatusTablaComponent,
    OficinaStatusFormComponent,
    ResumenesperaReporteComponent,
    ResumenatencionReporteComponent,
    CargatrabajoFormComponent,
    CargatrabajoReporteComponent,
    RangoatencionReporteComponent,
    RangoatencionFormComponent,
    RangoesperaFormComponent,
    RangoesperaReporteComponent,
    RankingdeatencionesFormComponent,
    RankingdeatencionesReporteComponent,
    ResumenmensualReporteComponent,
    ResumenmensualFormComponent,
    ResumentolFormComponent,
    ResumentolReporteComponent,
    ResumenatencionoagrReporteComponent,
    ResumenatencionoagrFormComponent,
    ResumenesperanoagrReporteComponent,
    TendenciaAtencionFormComponent,
    TendenciaAtencionReporteComponent,
    ResumenesperanoagrFormComponent,
    ProduccionFormComponent,
    ProduccionReporteComponent,
    RankingDeEjecutivosReporteComponent,
    RankingDeEjecutivosFormComponent,
    ProduccionTablaComponent,
    RankingDeEjecutivosTablaComponent,
    ZonasComponent,
    SucursalComponent,
    SucursalesComponent,
    ConversionSegundosPipe,
    TruncarTextoPipe,
    ConvertirSegundosHoraPipe,
    VistaToolbarComponent,
    VistaOnlineComponent,
    MotivosAtencionComponent,
    ReportesOficinasComponent,
    ReportesBatchComponent,
    ReportesBatchFormComponent,
    ReportesBatchListoComponent,
    ReportesBatchListadoComponent,
    ReportesBatchContenidoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    RecaptchaModule,
    ChartsModule,
    UserIdleModule.forRoot({idle: 590, timeout: 10, ping: 120}),
  ],
  providers: [
    ApiTtpService,
    ValidadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
