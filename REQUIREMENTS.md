# Pomodoro Features

### _#1_ Técnica Pomodoro

> Permite ao usuário realizar a técnica de pomodoro, que consiste em dividir o seu horário de trabalho em ciclos de **X** minutos e em seguida **Y** minutos, sendo **X** o tempo de trabalho e **Y** o tempo de descanso.

#### Requisitos funcionais

- [x] O usuário deve poder ver um cronômetro, que mostra o tempo da sessão de trabalho ou de descanso.
- [x] O usuário deve poder digitar/escolher quantos minutos irão durar os tempos X e Y.
- [x] O usuário deve poder iniciar, pausar ou parar o cronômetro.
- [x] O usuário deve poder visualizar a sessão atual, o tipo e o número total de sessões.
- [x] O usuário também deve poder resetar o cronômetro.
- [ ] O usuário deve poder ouvir um som de alerta no final de cada sessão.

#### Requisitos não-funcionais
- [ ] Criar componente **CircularProgressBar** para a barra de progresso do cronômetro.
- [ ] Criar componente **SliderInput** para os campos de entrada dos tempos de trabalho e descanso.
- [x] Criar componente **Alert** para visualização de mensagens de alerta.

#### Regras de negócio
- [x] Quando parado o cronômetro, o usuário reinicia somente a sessão atual.
- [x] Quando resetado o cronômetro, o usuário reinicia todas as sessões.
- [x] O número total de sessões sempre será quatro.
- [x] Na quarta sessão, o tempo de descanso deve ser o dobro do escolhido.
- [x] Após a quarta sessão, o cronômetro deve ser resetado.
- [x] O usuário não pode pausar o cronômetro durante a sessão de descanso.
- [x] O usuário só pode ouvir o som de alerta após o fim da sessão de trabalho ou descanso.
- [x] `Y <= X`
- [x] `5 < X <= 60`
- [x] `1 < Y <= 20`

---
