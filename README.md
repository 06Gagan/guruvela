# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Accepted Category Keywords

When asking the chatbot about college admissions or using the rank predictor,
the following category keywords are understood (case-insensitive):

- **OPEN**: `gen`, `general`, `open`
- **OPEN (PwD)**: `gen pwd`, `general pwd`, `open pwd`, `gen-pwd`
- **EWS**: `ews`
- **EWS (PwD)**: `ews pwd`, `ews-pwd`
- **OBC-NCL**: `obc`, `obc ncl`, `obc-ncl`
- **OBC-NCL (PwD)**: `obc ncl pwd`, `obc-ncl pwd`, `obc-ncl-pwd`
- **SC**: `sc`
- **SC (PwD)**: `sc pwd`, `sc-pwd`
- **ST**: `st`
- **ST (PwD)**: `st pwd`, `st-pwd`

## Environment Variables

Access to college prediction data relies on a Supabase backend. Create a `.env`
file in the project root and provide the following variables:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholders with the values from your Supabase project. Without
these credentials the chatbot will respond with a fallback message because it
cannot fetch prediction data. The JoSAA/CSAB prediction year and round values
are now hard-coded in `src/config/constants.js` and do not need to be supplied
via environment variables.
