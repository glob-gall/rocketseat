## RFs ( requisitos funcionais)

- [ ] deve ser possivel se cadastrar
- [ ] se autenticar
- [ ] obter um perfil de um usuario logado
- [ ] obter um numero de check-ins realizados pelo usuário
- [ ] usuario obter seu histórico de check-ins
- [ ] buscar academias próximas
- [ ] buscar academias pelo nome
- [ ] realizar check-in em uma academia
- [ ] validar o check-in de um usuário
- [ ] cadastrar uma academia

## RNs (Regras de negócio)

- [ ] usuario não pode cadastrar com email duplicado
- [ ] user não pdoe fazer check-in no mesmo dia
- [ ] não pdoe fazer check-in se não estiver perto da academia
- [ ] o check-in deve ser validade até 20 min depois de criado
- [ ] somente adms podem validar check-ins
- [ ] academia só pode ser administrada por admns

## RNFs (requisitos não-funcionais)

- [ ] a senha do usuario deve ser criptografada
- [ ] os dados da aplicação devem ser salvos em um banco postgresql
- [ ] todas listas de dados devem ser de 20 itens
- [ ] usuario deve ser autenticado por JWT
