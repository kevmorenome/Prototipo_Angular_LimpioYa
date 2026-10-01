# LimpioYa — Sistema de Gestión de Lavandería

Prototipo académico navegable desarrollado completamente con Angular 21, TypeScript, HTML y CSS. Utiliza componentes standalone, Angular Router, guards simulados y formularios reactivos. No contiene backend, API, base de datos, autenticación real ni servicios externos. No realiza cobros ni envía mensajes.

## Ejecutar

Requisitos: Node.js 22.12 o posterior dentro de la rama 22 (se verificó con Node 22.23.2) y npm.

Desde esta carpeta:

```sh
npm install
npm start
```

Abrir http://127.0.0.1:4200. Para compilar: `npm run build`. La salida se encuentra en `dist/browser`. No abras `index.html` directamente: Angular Router necesita el servidor local. El servidor de desarrollo devuelve la aplicación al abrir directamente sus rutas.

## Cuentas de demostración

| Perfil        | Correo               | Contraseña |
| ------------- | -------------------- | ---------- |
| Cliente       | cliente@limpioya.com | 123456     |
| Administrador | admin@limpioya.com   | 123456     |

El login incluye botones para entrar directamente con cada cuenta. El registro crea una cuenta de cliente local con la que también se puede iniciar sesión. La recuperación de contraseña muestra una confirmación simulada, sin correos.

## Guion para exponer

1. En la landing, abrir Iniciar sesión y entrar como cliente.
2. Crear pedido: elegir servicio, prenda y cantidad. Agregar varias líneas y revisar el total. Quitar una línea si se desea.
3. Confirmar y pulsar Ver pedido. Seleccionar distintos estados para actualizar el timeline de 11 etapas.
4. Agendar una recogida con fecha futura, hora y dirección. La cita aparece en la lista y en el dashboard.
5. Abrir Pagos y facturas, pulsar Pagar y elegir Tarjeta, PSE, Billetera digital o Efectivo.
6. Probar Pago rechazado: el saldo continúa pendiente. Volver a pagar y elegir Pago aprobado.
7. Revisar la factura visual; Imprimir / Guardar como PDF usa el diálogo del navegador. La factura no tiene validez fiscal.
8. Abrir Mis pedidos y filtrar por ID, estado o fecha. Actualizar el perfil si se desea.
9. Cerrar sesión y entrar como administrador.
10. Revisar el dashboard. En Pedidos, buscar el pedido recién creado y cambiar su estado.
11. Crear un cliente y revisar Información e Historial. Editar y desactivar registros.
12. Agregar o editar un empleado, cambiar su rol, desactivarlo y reactivarlo.
13. Agregar un servicio o cambiar su precio. El precio actualizado se usa en futuros pedidos; los pedidos existentes conservan su precio original.
14. En Métricas, comparar Hoy, 7 días, 30 días y Este año.
15. Volver a entrar como cliente para observar el estado actualizado por el administrador.

## Datos y persistencia

La primera apertura genera 15 pedidos, 8 clientes, 7 empleados, 5 servicios y 2 citas. Hay distintos estados, fechas y métodos de pago. El cliente demo tiene 7 pedidos; administración puede ver los 15. Los datos iniciales están ambientados en septiembre de 2026. Las nuevas operaciones usan la fecha actual en Bogotá.

Los servicios Angular trabajan con signals, arrays y localStorage. Los cambios sobreviven a una recarga en el mismo navegador y origen. Otro navegador o puerto tendrá datos separados. Para empezar de cero, borrar los datos del sitio para `127.0.0.1:4200` en las herramientas del navegador y recargar. Las claves del prototipo comienzan por `ly-`.

El registro almacena una contraseña de demostración local en texto plano, deliberadamente sin mecanismos reales de autenticación. Usa datos ficticios. La desactivación afecta al estado visual y a la disponibilidad de los servicios; no implementa políticas empresariales de permisos. Los guards simulan roles, y el cliente solo consulta sus propios pedidos. El cambio de estado del cliente se permite expresamente para demostrar el seguimiento.

Los gráficos se calculan con pedidos locales. Los ingresos suman pagos aprobados; el tiempo de entrega usa fechas mock de entrega estimada. No hay gráficos, fuentes, imágenes o recursos descargados por la aplicación desde servicios externos.

## Organización

```text
src/app/
  components/  Una carpeta por componente: TS + HTML + CSS.
               Navbar, Sidebar, Footer, StatCard, OrderCard, OrderTable,
               OrderStatus, OrderTimeline, ServiceCard, Modal, Notification,
               DataTable, EmptyState, LoadingState, Charts y EntityManager
  pages/
    landing/ login/ register/
    client/ dashboard/ create-order/ order-detail/ schedule/ payments/ history/ profile/
    admin/ dashboard/ orders/ clients/ employees/ services/ metrics/
  services/    AuthService, OrderService, ClientService, EmployeeService,
               ServiceService, PaymentService, ScheduleService y notificaciones
  models/      Tipos de datos y estados del pedido
  directives/  AutoFocusDirective (lyAutoFocus), usada en los modales
  guards/      Protección simulada por rol
  shared/      Persistencia local
```

El componente raíz mantiene su tríada `app.component.ts`, `app.component.html` y `app.component.css` directamente en `src/app/`. Los demás componentes y páginas son standalone y tienen su propia carpeta con archivos `.component.ts`, `.component.html` y `.component.css`. El TS contiene la lógica, el HTML la plantilla y el CSS los estilos específicos. `src/styles.css` conserva únicamente el tema, tipografía, formularios, tablas, utilidades y reglas de impresión compartidas. `main.ts` solo inicia la aplicación. La directiva standalone `lyAutoFocus`, en `src/app/directives/auto-focus.directive.ts`, enfoca el primer control al abrir los modales; la lógica de enfoque está separada del componente Modal. Las páginas administrativas de clientes, empleados y servicios reutilizan EntityManager para compartir tablas, validación y modales. Las rutas se cargan bajo demanda. El diseño adapta las tarjetas, formularios y navegación para móviles; las tablas se desplazan horizontalmente dentro de su contenedor.

## Verificación realizada

- Compilación completa con Angular 21.
- Flujo cliente: login, cálculo 3 × $8.000 = $24.000, creación, detalle y cambio de estado, agenda, pago rechazado, pago aprobado y factura.
- Flujo administrador: login, alta y búsqueda de clientes, edición de rol y desactivación de empleados, actualización de precios y estado del pedido, filtros de métricas.
- Persistencia del pedido y del pago tras recargar.
- Revisión visual en 390 px y 1440 px sin desbordamiento horizontal de la página.

## Alcance

Proyecto deliberadamente académico. Todas las interacciones operan en el navegador. No incluye backend, MySQL, JWT, bcrypt, pasarelas, DIAN, emails, SMS, notificaciones push, cloud ni seguridad de producción.
