describe('Mon premier test', () => {
    it("Visite de l'écran de démarrage", () => {
        cy.visit('http://localhost:5173')
        cy.get('main button').first().click()
        cy.url().should('include', '/addbook')
        cy.screenshot()
        //cy.get('body > div > header > nav > a').first().click()
    })
})
