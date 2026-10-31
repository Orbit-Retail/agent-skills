# Orbit Retail agent skills

Colección compartida para trabajar en proyectos de Orbit Retail.

## Skills propias disponibles

- `spira`: aplicaciones y desarrollo del framework Spira.
- `orbit-commit`: commits acotados y verificables.
- `orbit-pr`: preparación de PRs y corrección de observaciones verificadas.

## Diseño e implementación

| Carpeta | Skill / origen | Requisitos |
| --- | --- | --- |
| `ponytail` | DietrichGebert/ponytail | Guía de cambios mínimos |
| `taste` | Leonxlnx/taste-skill (`design-taste-frontend`) | Node 22+; navegador para inspección visual |
| `frontend-design` | anthropics/skills | Dirección visual |
| `impeccable` | pbakaus/impeccable | Su launcher descarga un motor verificado en el primer uso |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | Python 3 para búsquedas locales |
| `shadcn` | shadcn-ui/ui | Herramientas del proyecto y CLI según la tarea |
| `motion` | motiondivision/ai-kit | Buenas prácticas locales; MCP para búsquedas y herramientas adicionales |
| `react-bits` | Guía propia de Orbit | Integración con el catálogo gratuito oficial |

Las copias externas conservan recursos, atribuciones, licencias disponibles y
commit en `sources.json` y `ORIGIN.md`. UI UX Pro Max adapta únicamente sus rutas
de invocación para no depender de Claude. React Bits Pro y otros recursos premium
requieren su licencia y no se redistribuyen con esta colección.

Motion declara MIT en el paquete upstream `motion-ai`; ese commit no incluye un
archivo LICENSE independiente. La procedencia y declaración están registradas
en su `ORIGIN.md`. Las licencias de terceros prevalecen sobre esta colección.

Las reglas de cada proyecto permanecen en su AGENTS.md. Para diseño, elige una
dirección principal por tarea; no acumules reglas estéticas incompatibles de todas
las skills. Shadcn, React Bits y Motion resuelven implementación de componentes
y animación, no sustituyen el contexto de producto.

## Instalación local en Codex

Copia la carpeta de cada skill elegida desde `skills/` a `~/.codex/skills/`,
conservando sus referencias y recursos. Evita sobrescribir instalaciones existentes
sin revisar sus diferencias. Reinicia la sesión para descubrir nuevas skills.

Copiar Motion no configura su MCP. Para esas funciones, consulta la
[instalación oficial](https://motion.dev/docs/ai-kit-install) (`npx motion-ai`).
No se han instalado MCPs ni motores adicionales en el equipo al crear este repo.

## Estado

Incluye las once skills acordadas: siete copias externas y cuatro propias
(Spira, PR, Commit y la integración de React Bits). La presencia de una skill no
implica que todas sus integraciones o capacidades premium estén configuradas.
