# 🌐 TrackAI.party — Portal Web Oficial & Centro de Distribución

<div align="center">

# 🎚️ TrackAI.party Web

**Sitio Oficial, Manual de Cabina y Servidor de Actualizaciones para TrackAI**

[![Sitio Web Oficial](https://img.shields.io/badge/Web%20Oficial-trackai.party-FF0055?style=for-the-badge&logo=googlechrome&logoColor=white)](https://trackai.party)
[![Manual de Cabina](https://img.shields.io/badge/Manual-Online-00D2FF?style=for-the-badge&logo=gitbook&logoColor=white)](https://trackai.party/manual)
[![Última Versión](https://img.shields.io/badge/Release-v2.7.0-3DDC84?style=for-the-badge&logo=electron&logoColor=white)](https://github.com/alexispferrada-wq/trackai-web/releases)
[![Open Core](https://img.shields.io/badge/Core%20Lib-trackai--lib-yellow?style=for-the-badge&logo=github&logoColor=black)](https://github.com/alexispferrada-wq/trackai-lib)

*El copiloto inteligente de mezcla armónica en tiempo real para Serato DJ Pro/Lite, Virtual DJ y Rekordbox.*

</div>

---

## 📌 Descripción General

Este repositorio aloja la infraestructura web pública de **[TrackAI.party](https://trackai.party)**. Cumple tres funciones críticas en el ecosistema:

1. **Landing Page Comercial & Onboarding**: Experiencia visual de alta conversión que explica el motor armónico Camelot, Live Pitch® neural y el sistema de carga a platos en 1-clic.
2. **Centro de Documentación & Manuales**: Aloja el manual interactivo de cabina de 7 páginas (`manual.html`) y portal de certificación (`certificacion.html`).
3. **Servidor CDN de Actualizaciones en Caliente**: Distribución de `version.json` e instaladores oficiales compilados para macOS (Apple Silicon e Intel) y Windows 10/11.

---

## 🚀 Arquitectura y Enlaces Oficiales

- **Dominio Principal:** [https://trackai.party](https://trackai.party)
- **Manual de Cabina en Vivo:** [https://trackai.party/manual](https://trackai.party/manual)
- **Simulador Interactivo:** [https://trackai.party/trackai-demo.html](https://trackai.party/trackai-demo.html)
- **Endpoint de Auto-Update:** `https://trackai.party/version.json`

---

## 📦 Estructura del Repositorio

```
trackai-web/
├── index.html               # Landing page principal (TrackAI.party)
├── manual.html              # Manual oficial de cabina para DJs
├── certificacion.html       # Portal de validación de licencias y certificaciones
├── trackai-demo.html        # Simulador interactivo web
├── 404.html                 # Manejador SPA de rutas no encontradas
├── version.json             # Manifiesto activo de versión de producción (v2.7.0)
├── version-*.json           # Histórico de versiones para compatibilidad hacia atrás
├── assets/                  # Bundles optimizados de frontend (JS + CSS)
├── brand-v2/                # Identidad visual, favicons e íconos HD
└── og-image.jpg             # Meta tag Open Graph para redes sociales
```

---

## 🔄 Protocolo de Actualizaciones de la App (`version.json`)

La aplicación de escritorio TrackAI consulta periódicamente `https://trackai.party/version.json` para verificar si existe una nueva versión disponible. El esquema utilizado es:

```json
{
  "version": "2.7.0",
  "url_mac": "https://github.com/alexispferrada-wq/trackai-web/releases/download/v2.7.0/TrackAI-2.7.0-arm64.dmg",
  "url_mac_intel": "https://github.com/alexispferrada-wq/trackai-web/releases/download/v2.7.0/TrackAI-2.7.0-x64.dmg",
  "url_win": "https://github.com/alexispferrada-wq/trackai-web/releases/download/v2.7.0/TrackAI-2.7.0-x64.exe",
  "notes": "TrackAI v2.7.0 — Soporte oficial trackai.party, mejoras críticas de carga al plato y validación offline resiliente"
}
```

---

## 📥 Descargas Oficiales de TrackAI

| Sistema Operativo | Arquitectura | Formato | Descarga Directa |
|---|---|---|---|
| **macOS** | Apple Silicon (M1 / M2 / M3 / M4) | `.dmg` | [Descargar arm64](https://github.com/alexispferrada-wq/trackai-web/releases/latest) |
| **macOS** | Intel x64 | `.dmg` | [Descargar x64](https://github.com/alexispferrada-wq/trackai-web/releases/latest) |
| **Windows** | 10 / 11 (64-bit) | `.exe` | [Descargar Setup](https://github.com/alexispferrada-wq/trackai-web/releases/latest) |

---

## 🛠️ Despliegue y Mantenimiento

El portal está optimizado para entrega ultra rápida con caché en edge (Cloudflare) y respaldo continuo en GitHub Pages.

1. **Actualizar contenido:**
   Cualquier cambio empujado a la rama `main` se publica automáticamente en el CDN global de [trackai.party](https://trackai.party).

2. **Lanzar nueva versión de la app:**
   - Crear un nuevo Release etiquetado en este repositorio con los binarios (`.dmg` y `.exe`).
   - Actualizar `version.json` con el nuevo tag de versión, URLs y notas de lanzamiento.

---

<div align="center">

© 2026 **TrackAI.party** · Hecho con 🎧 para DJs de todo el mundo.  
Soporte oficial: `contacto@trackai.party`

</div>
