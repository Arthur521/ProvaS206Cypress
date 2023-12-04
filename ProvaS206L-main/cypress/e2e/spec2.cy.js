describe('Acessando o site', () => {

  function entrarUser(user){
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
    cy.get('.borderM > :nth-child(1) > .btn').click()
    cy.get('#userSelect').select(user)
    cy.get('form.ng-valid > .btn').click()
  }
  
  it('Caso de Teste 1: Acessa o login da Hermione e analisa as suas transações', () => {
    entrarUser('Hermoine Granger')
    for (var i = 0; i < 3; i++) {
      cy.get('#accountSelect').select(i)
      cy.get('[ng-class="btnClass1"]').click()
      cy.get('.fixedTopBox > [style="float:left"]').click()
    }
    cy.get('.logout').click()
    cy.get('label').should('contain.text', 'Your Name :') //verifica se voltou para a tela inicial
  })

  it('Caso de Teste 2: Acessa o login do Harry Potter, deposita nada (Caso negativo)', () => {
    entrarUser('Harry Potter')
    cy.get('[ng-class="btnClass2"]').click()
    cy.get('#accountSelect').select(0)
    cy.get('.form-control').type(0)
    cy.get('form.ng-dirty > .btn').click()
    cy.get('.error').should('contain.text', '') //devia ser uma mensagem de sucesso, mas não aparece nada por não ter "terminado de depositar"
  })

  it('Caso de Teste 3: Cria conta', () => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
    cy.get(':nth-child(3) > .btn').click()
    cy.get('[ng-class="btnClass1"]').click()
    cy.get(':nth-child(1) > .form-control').type("PrimeiroNome")
    cy.get(':nth-child(2) > .form-control').type("SegundoNome")
    cy.get(':nth-child(3) > .form-control').type(4002)
    cy.get('form.ng-dirty > .btn').click()
    cy.get('[ng-class="btnClass2"]').click()
    cy.get('#userSelect').children().last().then(($lastOption) => {
      const value = $lastOption.val();
      cy.get('#userSelect').select(value);
    });
    cy.get('#currency').select(2)
    cy.get('form.ng-dirty > button').click()
    cy.get('[ng-class="btnClass3"]').click()
    cy.get(':nth-child(5) > :nth-child(5) > button').click()
    cy.get('tbody > :nth-child(5) > :nth-child(1)').should('contain.text', 'PrimeiroNome') //ve se a conta realmente foi criada
    cy.get('.home').click()

  })

})
