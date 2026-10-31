---
name: spira
description: Build and debug Orbit APIs using Spira, including modules, controllers, constructor injection, Koa middleware, Zod request validation and AppError. Also use when changing the Spira framework itself. Not for unrelated TypeScript backends.
---

# Spira

Spira composes HTTP APIs over Koa. Factories compose the app; decorators describe metadata; Koa executes requests. Keep business rules out of the HTTP adapter.

## Establish the installed contract

Read the project's AGENTS.md, package.json, TypeScript configuration and relevant existing modules. Determine whether the task changes an application consuming Spira or the framework itself.

The package is `@froggydev/spira`. Check the installed version and public declarations before using an API. Import from the package entrypoint, not `dist/` internals. The local framework README and tests describe implemented behavior; the [design manual](https://linear.app/orbit-retail/document/manual-de-spira-orbit-backend-framework-7a7762710bcf) describes intent and can lag implementation. Do not treat its pending-work list as current status. If the manual is inaccessible, state that limitation when design decisions depend on it.

This skill was checked against framework commit `475ed0264bce58ad6c26940b65e988310c518449`, version 1.0.0. Verify differences against the consumer's version rather than silently upgrading it.

## Compose an application

- Use `spira.module.create({ name, controllers, middlewares? })`, then `spira.create({ modules, middlewares?, onError? })`.
- Register controllers explicitly in the module. Services are inferred from constructor metadata; no duplicate provider registration.
- `name` identifies a module; it does not prefix URLs. URLs combine `@Controller` and the HTTP method decorator's path.
- `app.listen(port)` returns a Node HTTP server. Close it in integration tests. Do not assume an Express-style `app.use`, `callback`, or serverless adapter is exposed.
- Follow the application's existing folder structure. A new business module can separate controllers, application services, domain and infrastructure; do not impose that structure on unrelated code.

## Dependency injection

Use legacy TypeScript decorators with `experimentalDecorators` and `emitDecoratorMetadata`. The public entrypoint loads `reflect-metadata` and must evaluate before decorated classes. Verify that the actual compiler emits constructor metadata; TypeScript options alone do not make every transpiler emit it.

Controllers use `@Controller()`. Concrete services and repositories use `@Injectable()`. Constructor dependencies must be runtime class values, not type-only imports, interfaces, primitives or generic tokens.

Each class has one shared instance per app. Never store request-specific user, auth, body or context state on controller/service fields. Pass request values through method arguments. Circular dependencies and missing metadata are bootstrap errors, not dependencies to skip.

There is no public provider/scope/token configuration in this version. Do not invent `@Inject`, `@Module`, `@Use`, `@Ctx`, `@Aeon`, queues or cron APIs.

## HTTP arguments and responses

Use `@Get`, `@Post`, `@Put`, `@Patch` and `@Delete` on controller methods.

- `@Body(schema?)` extracts the whole body.
- `@Query(name, schema?)` extracts one query value.
- `@Param(name, schema?)` extracts one route parameter.
- Without a schema, values are not converted. Query values are not automatically numbers or booleans.
- With a Zod schema, the runtime awaits validation and passes the parsed/transformed value. Type arguments according to the schema output, e.g. `z.infer<typeof Schema>`.
- With any parameter decorators, decorate every declared argument. The runtime supplies only those values, without an extra context argument.
- With no parameter decorators, the method receives `SpiraContext` as its sole argument. Use this mode when manual response control or auth context is needed; there is no `@Ctx()`.

Return the response value from the controller. Promises are awaited; a non-undefined result becomes `ctx.body`. Returning undefined preserves an explicitly written context response. Koa determines default statuses, including 204 for null; set status/headers through context when the endpoint requires it.

## Middleware and errors

App and module `middlewares` contain factories `() => Middleware`. Controller middleware uses direct functions in `@Controller({ path, middlewares })`. Do not confuse these signatures.

Entry order: Spira error boundary, body parser, app middleware, module middleware, controller middleware, argument validation, controller method. Respect Koa's `await next()` onion flow. Module middleware applies only to matching module routes.

Authentication belongs to application middleware. Populate `ctx.auth` there; Spira does not verify JWTs for you. Keep authorization at the appropriate route/module boundary.

Throw `new AppError({ code, status, message, details? })` for expected failures. Status must be an integer from 400 to 599. Message/details are public: never include credentials, raw database errors or sensitive request payloads. `HTTP_ERRORS[409]` provides a semantic code; business codes are also supported. The global boundary formats errors as `{ error: { code, message, details? } }`. Unexpected failures produce a generic 500 and are logged through the app error event / configured `onError`. Avoid repetitive controller try/catch blocks that swallow failures.

Read [the example](references/example.ts) when creating a module or explaining the composition flow.

## Verify the requested change

Use the repository's actual scripts. For the framework, the current checks are `npm run typecheck`, `npm test -- --runInBand`, and `npm run build`; do not edit generated dist files. A consumer may use a different runner.

For HTTP behavior, exercise a request through the app, including the relevant invalid-input or authorization case. Confirm validation prevents controller execution and that middleware does not affect another module when isolation changes. For DI changes, check reuse, app isolation and cycles as relevant. Keep tests focused on the change rather than copying the entire framework suite.

When teaching, start from the user's code and explain one mechanism at a time. Provide a full implementation when requested; avoid replacing a learning exercise with unsolicited abstractions.
