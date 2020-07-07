# Changelog
All notable changes to this project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2020-07-07
### Added
- Auth using LDAP and `@nuxtjs/auth`
- `auth.js` to api folder
- login & toc pages
- noauth layout
- changelog

### Removed
- User from store, $auth now does this job

### Changed
- `nuxt.config.js` modules, serverMiddleware, axios, proxy, auth & router
- default layout to have user name and menu to logout

