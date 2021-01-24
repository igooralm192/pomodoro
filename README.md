<!-- Logo -->

<p align="center">
  <img alt="Project Logo" width="450px" src="./.github/logo.svg" />
<p>

<!-- Badges -->

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react"/>
  <img alt="JavaScript" src="https://img.shields.io/badge/typescript%20-%23323330.svg?style=for-the-badge&logo=typescript"/>
  <img alt="Figma" src="https://img.shields.io/badge/figma%20-%23F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white"/>
</p>

<!-- Description -->

<h4 align="center">
	🚀 Aplicação que te permite desfrutar do pomodoro! 💥
</h4>

<!-- Project Design -->

<p align="center">
  <img alt="Project Design 1" width="200px" src="./.github/design-1.jpg" />
  <img alt="Project Design 2" width="200px" src="./.github/design-2.jpg" />
  <img alt="Project Design 3" width="200px" src="./.github/design-3.jpg" />
  <img alt="Project Design 4" width="200px" src="./.github/design-4.jpg" />
<p>

<!-- Summary -->

<h2>Índice</h2>

- [:bookmark: Sobre](#bookmark-sobre)
- [:framed_picture: Layout](#framed_picture-layout)
- [:computer: Demo](#computer-demo)
- [:rocket: Tecnologias](#rocket-tecnologias)
- [:book: O que aprendi](#book-o-que-aprendi)
- [:recycle: Como contribuir](#recycle-como-contribuir)
- [:memo: Licença](#memo-licença)

<a id="sobre"></a>

## :bookmark: Sobre

A Técnica Pomodoro é um método de gerenciamento de tempo desenvolvido por Francesco Cirillo no final dos anos 1980.

A técnica usa um cronômetro para dividir o trabalho em intervalos, tradicionalmente de 25 minutos de duração, separados por intervalos curtos - 5 minutos.

Nesta aplicação, além de cronometrar as suas sessões de trabalho/descanso, pode-se personalizar quanto tempo haverá em tais sessões.

<a id="layout"></a>

## :framed_picture: Layout

O layout desta aplicação está disponível no [Figma](https://www.figma.com/file/7u1JrbxEDbY72ZF6bYsX9N/Pomodoro-App?node-id=0%3A1).

<a id="demo"></a>

## :computer: Demo

Essa aplicação foi hospedada pelo [Netlify](https://www.netlify.com/) e pode ser encontrada aqui: [Pomodoro](https://pomodoro-iguzinho.netlify.app/).

<a id="tecnologias"></a>

## :rocket: Tecnologias

Essa aplicação se utiliza das seguintes tecnologias:

-  [TypeScript](https://www.typescriptlang.org/)
-  [ReactJS](https://reactjs.org/)
-  [ESLint](https://eslint.org/) (Padronização de código)
-  [Prettier](https://prettier.io/) (Formatação de código)
-  [Sass](https://sass-lang.com/) (Pré-processador CSS)
-  [React Sound](https://github.com/leoasis/react-sound) (Reprodução de áudios)

<a id="o-que-aprendi"></a>

## :book: O que aprendi
- ### Memoização
Para evitar redefinições dos callbacks a cada re-renderização do componente, foi utilizado o `useCallback` que retornará um callback memoizado, ou seja, mantém um valor salvo para otimizar performance.

Além disso, passando um array de dependências, pode-se redefinir os callbacks condicionalmente, isto é, caso um dos valores passados no arary mude o callback irá ser redefinido.
```tsx
const handleStart = useCallback(() => {
  startTimer({
    minute: workingTime,
    second: 0,
  })
}, [workingTime, startTimer])
```
Neste método, o `handleStart` só irá ser redefinido caso `workingTime` ou `startTimer` mudem de valor.

- ### Limpeza de efeitos
Graças ao `useEffect`, é possível executar efeitos colaterais após cada renderização concluída do componente. No entanto, diversas vezes efeitos criam recursos que precisam ser desfeitos ou limpos antes que o componente deixe a tela, como fechar uma Stream ou limpar a memória utilizada por uma variável.

Para fazer isso, basta retornar uma função de limpeza no `useEffect`, onde esta irá ser executada **antes que o componente seja removido da interface**.
```tsx
useEffect(() => {
  let timeout: NodeJS.Timeout

  if (timerState === TimerState.IN_PROGRESS) {
    timeout = setTimeout(handleTime, INTERVAL_TIME)
  }

  return () => clearTimeout(timeout)
}, [time, timerState])
```
O código acima é um efeito que cria um timeout a cada segundo para modificar o tempo do cronômetro. Caso `time` ou `timerState` mudem, o efeito irá ser executado novamente, porém antes disso o `clearTimeout(timeout)` é executado na função de limpeza para remover o timeout anterior.

Dessa forma não há o risco de haver timeouts duplicados.

- ### Referência de elementos
Com o `useRef`, foi possível capturar a referência de elementos HTML.
```tsx
const alertRef = useRef<HTMLDivElement>(null)
//...
<div className="alert-container" ref={alertRef}>
{/* ... */}
</div>
```
Dessa forma, pode-se acessar o DOM deste elemento usando `alertRef.current`.
```tsx
function animateShowAlert() {
  if (!alertRef) return
  if (!alertRef.current) return

  alertRef.current.classList.add('active-alert')
}
```
<a id="como-contribuir"></a>

## :recycle: Como contribuir

- Crie um fork desse repositório,
- Crie uma branch com o nome da sua feature: `git checkout -b my-feature`
- Faça um commit das suas alterações: `git commit -m 'feat: My new feature'`
- Faça um push da sua branch: `git push origin my-feature`


<a id="licenca"></a>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
<p align="center">
  Feito com ❤️ por <a href="https://github.com/igooralm192" target="_blank">Igor Almeida</a>!!
</p>