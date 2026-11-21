# 🎀 Ateliê das Bonecas — Aplicativo PWA Interativo

Um aplicativo infantil e educativo em formato **PWA (Progressive Web App)** onde crianças e adultos podem escolher entre cinco bonecas artesanais — **Olívia**, **Larissa**, **Mônica**, **Abner** e **Alyne** — e montá-las manualmente arrastando e encaixando cada pecinha sobre o molde, ao som de uma música alegre de caixinha de música, com direito a **confetes e comemoração de "VIVA!!"** ao concluir cada uma.

---

## ✨ Funcionalidades

- **Menu lateral com 5 bonecas artesanais:**
  - **Olívia** (12 peças: perninhas, tênis, calçola com renda, bracinhos, blusinha escolar, jardineira xadrez, rosto, cachos castanhos e laço)
  - **Larissa** (10 peças: perninhas, sapatilhas, bracinhos, vestido rosa & floral com flamingos, cachos pretinhos, rostinho e lacinhos rosa)
  - **Mônica** (10 peças: perninhas, sapatilhas rosa, bracinhos, vestido rosa princesa com renda, cachos dourados, rostinho com sardas e laço & tiara rosa)
  - **Abner** (10 peças: perninhas, sapatinhos marrons, bracinhos, camiseta de bolinhas, jardineira de bichinhos, cachinhos caramelo e rostinho)
  - **Alyne** (10 peças: perninhas, sapatilhas, bracinhos, vestido verde-menta com renda, cachos clarinhos, rostinho e lacinho verde-menta)
- **Montagem manual por arrastar e soltar (Mouse e Toque):** funciona perfeitamente no computador, tablet e celular.
- **Encaixe magnético inteligente:** ao aproximar a peça do lugar correto na silhueta, um guia luminoso acende e encaixa a peça com precisão, acompanhado de sininho e estrelinhas.
- **Botão "💡 Dica":** destaca qual peça encaixar e pisca exatamente o local dela no molde — ideal para crianças pequenas.
- **Música de caixinha de música + efeitos sonoros:** melodia infantil alegre gerada em tempo real (funciona 100% offline, sem depender de arquivos MP3 externos), com botão de pausar e controle de volume.
- **Celebração de vitória:** ao encaixar a última peça, dispara chuva de confetes coloridos, fanfarra alegre, banner **"🎉 VIVA!! PARABÉNS!! 🎉"** e salva o selo **🏆 Montada!** no menu lateral.
- **Instalável como aplicativo (PWA):** pode ser instalado na tela inicial do celular (Android e iOS) e do computador, funcionando inclusive **sem internet** após o primeiro acesso.

---

## 🛠️ Stack Tecnológica Utilizada

O projeto foi construído com foco em **simplicidade, desempenho instantâneo, zero dependências pesadas e compatibilidade total com instalação PWA**:

| Camada | Tecnologia | Para que foi usada |
| :--- | :--- | :--- |
| **Interface & Layout** | **HTML5 + CSS3** (Grid, Flexbox, animações CSS) | Estrutura responsiva com menu lateral no desktop e gaveta retrátil no celular |
| **Lógica & Interatividade** | **JavaScript Vanilla (ES6+)** + **Pointer Events** | Motor unificado de arrastar e soltar (*drag & drop*) compatível com mouse, caneta e dedo (touch) |
| **Áudio & Música** | **Web Audio API** | Síntese em tempo real da melodia de caixinha de música, sininhos de encaixe e fanfarra de vitória |
| **Efeitos Visuais** | **HTML5 Canvas 2D** | Animação de física da chuva de confetes coloridos ao finalizar cada boneca |
| **PWA (App Instalável)** | **Web App Manifest** + **Service Worker** | Permite instalar o app no celular/PC e faz cache dos arquivos para uso offline |
| **Persistência Local** | **LocalStorage** | Salva automaticamente quais bonecas já foram montadas (`🏆 Montada!`) |
| **Preparação das Imagens** | **Python + Pillow (PIL)** *(offline, na criação)* | Recorte preciso das peças com fundo transparente, geração das silhuetas-guia, miniaturas e ícones PWA |

---

## 🧩 Como o Projeto Foi Feito

1. **Extração e recorte das peças reais:**
   - A partir das imagens originais (`olivia.jpg`, `monica.png` e `larissa.png`), foi utilizado um script em **Python com Pillow** para remover o fundo (com *floodfill* conectado às bordas para preservar rendas e meias brancas) e separar cada boneca em peças individuais com fundo transparente.
   - Cada peça foi recortada exatamente no seu retângulo delimitador (*bounding box*) e suas coordenadas relativas (`x`, `y`, `w`, `h` em porcentagem) foram calculadas e salvas em `assets/dolls-data.json` (e embutidas no `index.html` para funcionar até sem servidor).
   - Para cada boneca também foram geradas automaticamente uma **silhueta translúcida** (`silhouette.png`) para guiar a montagem e uma **miniatura** (`thumb.png`) para o menu lateral.
2. **Motor de arrastar e soltar (Drag & Drop):**
   - Usa `pointerdown`, `pointermove` e `pointerup` com `setPointerCapture` e `touch-action: none`, evitando que a tela role enquanto a criança arrasta uma peça no celular.
   - Calcula em tempo real a distância entre o centro da peça arrastada e a coordenada exata de destino no molde. Quando entra no raio de tolerância, acende o guia verde e encaixa a peça no `z-index` correto.
3. **Configuração PWA:**
   - Criado o arquivo `manifest.webmanifest` com metadados do app e ícones (`192x192` e `512x512`).
   - Criado o Service Worker (`sw.js`) que armazena em cache os recursos principais e cada peça acessada, garantindo funcionamento offline.

---

## 📁 Estrutura de Pastas

```text
bonecaria/
├── index.html               # Aplicativo principal (HTML + CSS + JS)
├── manifest.webmanifest     # Configuração do aplicativo PWA (nome, cores, ícones)
├── sw.js                    # Service Worker para cache e funcionamento offline
├── README.md                # Esta documentação
├── olivia.jpg               # Imagem original da Olívia
├── monica.png               # Imagem original da Mônica
├── larissa.png              # Imagem original da Larissa
├── icons/
│   ├── icon-192.png         # Ícone do app (192x192)
│   └── icon-512.png         # Ícone do app (512x512)
└── assets/
    ├── dolls-data.json      # Mapa de coordenadas de todas as peças
    ├── olivia/              # 12 peças recortadas + silhouette.png + thumb.png
    ├── monica/              # 10 peças recortadas + silhouette.png + thumb.png
    └── larissa/             # 10 peças recortadas + silhouette.png + thumb.png
```

---

## 💻 Como Testar Localmente no Computador

### Forma rápida (sem instalar nada)
Basta dar um clique duplo no arquivo **`index.html`** para abrir direto no navegador (Chrome, Edge, Firefox ou Safari) e brincar imediatamente.

### Forma completa (testando recursos de PWA / Service Worker)
Navegadores exigem `http://localhost` ou `https://` para ativar o Service Worker. Para testar localmente com um servidor simples usando Python:

1. Abra o terminal (PowerShell ou Prompt de Comando) dentro da pasta `bonecaria`.
2. Execute:
   ```bash
   python -m http.server 8000
   ```
3. Abra no navegador o endereço:
   ```text
   http://localhost:8000
   ```

---

## 🌐 Como Subir para a Internet (Gratuito e com HTTPS)

Para que o aplicativo possa ser **instalado como PWA no celular**, ele precisa estar publicado em um endereço com **HTTPS**. Como o projeto é 100% estático (HTML/CSS/JS/imagens), você pode hospedar gratuitamente em menos de 2 minutos usando qualquer uma das opções abaixo:

### Opção 1: Netlify Drop (Mais fácil — sem precisar de Git!)
1. Acesse [https://app.netlify.com/drop](https://app.netlify.com/drop) (crie uma conta gratuita se desejar manter o link fixo).
2. **Arraste a pasta inteira `bonecaria`** para dentro da área tracejada na página.
3. Em poucos segundos, o Netlify vai publicar tudo e te dar um link `https://....netlify.app` pronto para abrir e instalar no celular!

### Opção 2: GitHub Pages (Gratuito e ótimo para atualizar depois)
1. Crie um repositório no [GitHub](https://github.com) (ex: `atelie-das-bonecas`).
2. Envie os arquivos da pasta `bonecaria` para o repositório:
   ```bash
   git init
   git add .
   git commit -m "Versão inicial do Ateliê das Bonecas PWA"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/atelie-das-bonecas.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**.
4. Em **Branch**, selecione `main` e pasta `/ (root)`, depois clique em **Save**.
5. Em ~1 minuto seu app estará no ar em `https://SEU_USUARIO.github.io/atelie-das-bonecas/`.

### Opção 3: Vercel
1. Acesse [https://vercel.com](https://vercel.com), conecte sua conta do GitHub e clique em **Add New → Project**.
2. Selecione o repositório `atelie-das-bonecas` e clique em **Deploy** (não precisa configurar comando de build).

---

## 📲 Como Instalar no Celular e no Computador

Depois que o projeto estiver publicado em um endereço **HTTPS** (Netlify, GitHub Pages ou Vercel):

### No Android (Chrome ou Edge)
1. Abra o link do aplicativo no navegador do celular.
2. Clique no botão **"📲 Instalar Aplicativo"** que aparece no menu lateral esquerdo (ou toque nos **3 pontinhos** no canto superior direito do Chrome → **"Instalar aplicativo"** / **"Adicionar à tela inicial"**).
3. Confirme em **Instalar**. O ícone do **Ateliê Bonecas** aparecerá junto aos outros apps do seu telefone e abrirá em tela cheia!

### No iPhone / iPad (Safari)
1. Abra o link do aplicativo no **Safari**.
2. Toque no botão **Compartilhar** (ícone de quadrado com seta para cima na barra inferior).
3. Role para baixo e toque em **"Adicionar à Tela de Início"**.
4. Toque em **"Adicionar"** no canto superior direito.

### No Computador (Chrome ou Edge)
1. Abra o link do aplicativo.
2. Clique no ícone de **instalação (computador com setinha)** no canto direito da barra de endereços ou no botão **"📲 Instalar Aplicativo"** no menu lateral.

---

Feito com carinho para levar criatividade e diversão em cada pecinha! 🧵✨
