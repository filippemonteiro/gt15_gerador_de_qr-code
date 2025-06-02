# Gerador de QR Code

Uma aplicação full-stack para gerar QR Codes personalizáveis usando React.js no frontend e Node.js no backend, integrando com a API QuickChart.

## Funcionalidades

- Gera QR Codes para URLs, textos e informações de contato
- Personalize o tamanho, cores e formato (PNG/SVG) do QR Code
- Faça o download dos QR Codes gerados
- Validação e visualização em tempo real
- Design responsivo para todos os dispositivos

## Tecnologias Utilizadas

### Frontend
- React.js com Vite
- Tailwind CSS para estilos
- Framer Motion para animações
- Axios para requisições à API
- React Hot Toast para notificações

### Backend
- Node.js com Express
- Axios para requisições à API QuickChart
- Joi para validação de entradas
- CORS para compartilhamento de recursos entre origens diferentes

## Primeiros Passos

### Pré-requisitos
- Node.js (v14+)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/filippemonteiro/gt15_gerador_de_qr-code
cd gt15_gerador_de_qr-code
```

2. Instale as dependências
```bash
npm run install:all
```

3. Inicie os servidores de desenvolvimento
```bash
npm run dev
```

Isso iniciará tanto o servidor backend (porta 5000) quanto o servidor de desenvolvimento do frontend (porta 3000).

## Estrutura do Projeto

```
.
├── backend/                 # Backend em Node.js
│   ├── src/
│   │   ├── controllers/     # Manipuladores de requisições
│   │   ├── routes/          # Rotas da API
│   │   ├── utils/           # Funções utilitárias
│   │   └── index.js         # Ponto de entrada do servidor
│   └── package.json         # Dependências do backend
├── frontend/                # Frontend em React.js
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── services/        # Funções de serviço da API
│   │   ├── utils/           # Funções utilitárias
│   │   ├── App.jsx          # Componente principal da aplicação
│   │   └── main.jsx         # Ponto de entrada da aplicação
│   └── package.json         # Dependências do frontend
└── package.json             # Package.json raiz com os scripts
```

## Endpoints da API

### `/api/qr/generate`
- **Método:** POST
- **Corpo:** 
  ```json
  {
    "text": "https://example.com",
    "size": 200,
    "dark": "000000",
    "light": "ffffff",
    "format": "png"
  }
  ```
- **Resposta:** Imagem do QR Code

### `/api/qr/validate`
- **Método:** POST
- **Corpo:** Igual ao anterior
- **Resposta:** 
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Entrada validada com sucesso"
  }
  ```

## Licença

MIT