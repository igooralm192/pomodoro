# Pomodoro Features

### _#1_ Técnica Pomodoro

> Permite ao usuário realizar a técnica de pomodoro, que consiste em dividir o seu horário de trabalho em ciclos de **X** minutos e em seguida **Y** minutos, sendo **X** o tempo de trabalho e **Y** o tempo de descanso.

#### Requisitos funcionais

- [x] O usuário deve poder ver um cronômetro com tempo X, sendo X a sessão de trabalho ou descanso.
- [x] O usuário deve poder iniciar, pausar e resetar o cronômetro.
- [x] O usuário deve poder digitar/escolher quantos minutos irão durar os tempos X e Y.
- [x] Quando iniciado o cronômetro, o usuário deve poder visualizar o tempo decrescendo de X até 00:00.
- [x] Quando pausado o cronômetro, o usuário deve poder resumir a sessão.
- [x] Quando resetado o cronômetro, o usuário deve poder recomeçar a sessão.

#### Regras de negócio

- [x] O usuário não pode pausar o cronômetro durante a sessão de descanso.
- [x] `Y <= X`
- [x] `5 < X <= 60`
- [x] `1 < Y <= 20`

---
