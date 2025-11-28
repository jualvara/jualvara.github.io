# CRM Lead Rule Scoring (Odoo 18)

Repositorio: [odoo-crm-lead-rule-scoring](https://github.com/jualvara/odoo-crm-lead-rule-scoring)

## Descripción

Este módulo añade **Lead Scoring configurable por reglas** al CRM de Odoo 18 Community.

Permite:

- Definir reglas de puntuación de leads y oportunidades (según fuente, país, industria, importe estimado, equipo, etapa, etc.).
- Calcular automáticamente un **score numérico** en cada lead (`score_rule`).
- Clasificar los leads en segmentos de score (Bajo / Medio / Alto).
- Disparar **acciones automáticas** cuando el score entra en un rango o cambia cierta cantidad:
  - Asignar el lead a un equipo de ventas o a un usuario.
  - Crear una actividad (por ejemplo: llamada de calificación).
  - Enviar un email con una plantilla predefinida.
- Recalcular periódicamente los scores mediante un **cron**.


## Instalación

1. Clonar el repositorio en la carpeta `addons` de Odoo (o añadir la ruta en `--addons-path`).
2. En **Apps**, actualizar la lista y buscar **CRM Lead Rule Scoring**.
3. Instalar. Se instalarán automáticamente `crm` y `mail` (únicas dependencias).

## Manual de uso y configuración

1. **Activar/pausar recálculo automático**
   - Ruta: **Ajustes > CRM > Lead Scoring por Reglas**.
   - Opción: *Recalcular scores automáticamente* (activa/desactiva el cron periódico).

2. **Definir reglas de scoring**
   - Ruta: **CRM > Configuración > Reglas de Score**.
   - Crear una regla con las condiciones deseadas (país, industria, fuente, etapa, equipo, importe estimado, etc.).
   - Asignar la puntuación (positiva o negativa) y, si procede, el segmento.

3. **Configurar acciones automáticas**
   - Ruta: **CRM > Configuración > Acciones de Score**.
   - Crear acciones que se disparen cuando el score entre en un rango o cambie un umbral.
   - Acciones disponibles: reasignar equipo/usuario, crear actividad, enviar email con plantilla, etc.

4. **Ver el score en los leads**
   - Ruta: **CRM > Leads/Oportunidades** (kanban, lista o formulario).
   - El campo `Score` aparece y se actualiza al crear/editar o cuando corre el cron.

5. **Forzar recálculo manual (opcional)**
   - Ir a **Ajustes > Técnico > Acciones programadas** y ejecutar *Recalcular score de leads por reglas*.
   - O bien, editar y guardar un lead para recalcularlo al instante.

## Uso

- Los scores se calculan automáticamente al crear/editar un lead.
- Se puede ver el score en la vista de lista y formulario de leads.
- Las acciones se ejecutan según las reglas configuradas.

## Dependencias

- Odoo 18 Community
- Módulo `crm` (incluido en Odoo)

## Contribución

Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este módulo está bajo la licencia AGPL-3.

**Autor:** Juan Alvarado — juanalvara@ucm.es
**Versión:** 18.0.1.0.0
