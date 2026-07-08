const validUser = {
  email: 'customer3@practicesoftwaretesting.com',
  password: 'pass123',
  name: 'Bob Smith',
};
const invalidEmail = 'invalid@example.com';
const invalidPassword = 'invalidpassword';
const invalidCredentialsMessage = 'Invalid email or password';
const accountLockedMessage =
  'Account locked, too many failed attempts. Please contact the administrator.';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="nav-sign-in"]').click();
  });
  it('User can sign in with valid credentials', () => {
    cy.get('[data-test="email"]').type(validUser.email);
    cy.get('[data-test="password"]').type(validUser.password);
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="nav-menu"]', validUser.name).should('be.visible');
  });
  it('User cannot sign in with invalid email', () => {
    cy.get('[data-test="email"]').type(invalidEmail);
    cy.get('[data-test="password"]').type(validUser.password);
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="login-error"]', invalidCredentialsMessage).should(
      'be.visible',
    );
  });
  it('User cannot sign in with invalid password', () => {
    cy.get('[data-test="email"]').type(validUser.email);
    cy.get('[data-test="password"]').type(invalidPassword);
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="login-error"]', invalidCredentialsMessage).should(
      'be.visible',
    );
  });
  it('User cannot sign in with invalid email and password', () => {
    cy.get('[data-test="email"]').type(invalidEmail);
    cy.get('[data-test="password"]').type(invalidPassword);
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="login-error"]', invalidCredentialsMessage).should(
      'be.visible',
    );
  });
  it('User cannot sign in with empty email', () => {
    cy.get('[data-test="password"]').type(validUser.password);
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="email-error"]', 'Email is required').should(
      'be.visible',
    );
  });
  it('User cannot sign in with empty password', () => {
    cy.get('[data-test="email"]').type(validUser.email);
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="password-error"]', 'Password is required').should(
      'be.visible',
    );
  });
  it('User cannot sign in with empty email and password', () => {
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="email-error"]', 'Email is required').should(
      'be.visible',
    );
    cy.contains('[data-test="password-error"]', 'Password is required').should(
      'be.visible',
    );
  });
  it('User cannot sign in with invalid email format', () => {
    cy.get('[data-test="email"]').type('invalid-email-format');
    cy.get('[data-test="password"]').type(validUser.password);
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="email-error"]', 'Email format is invalid').should(
      'be.visible',
    );
  });
  it('User cannot sign in with password less than 3 characters', () => {
    cy.get('[data-test="email"]').type(validUser.email);
    cy.get('[data-test="password"]').type('12');
    cy.get('[data-test="login-submit"]').click();

    cy.contains(
      '[data-test="password-error"]',
      'Password length is invalid',
    ).should('be.visible');
  });
  it('User account is locked after 3 consecutive failed login attempts', () => {
    cy.get('[data-test="email"]').type(validUser.email);
    for (let i = 0; i < 3; i++) {
      cy.get('[data-test="password"]').clear();
      cy.get('[data-test="password"]').type(invalidPassword);
      cy.get('[data-test="login-submit"]').click();

      cy.contains(
        '[data-test="login-error"]',
        invalidCredentialsMessage,
      ).should('be.visible');
    }

    cy.get('[data-test="password"]').clear();
    cy.get('[data-test="password"]').type(validUser.password);
    cy.get('[data-test="login-submit"]').click();

    cy.contains('[data-test="login-error"]', accountLockedMessage).should(
      'be.visible',
    );
  });
});
