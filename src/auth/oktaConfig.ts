import { OktaAuth } from "@okta/okta-auth-js";

export const oktaAuth = new OktaAuth({
  issuer: "https://integrator-8263876.okta.com/oauth2/default",
  clientId: "0oa12eo664qyqYfxb698",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
});