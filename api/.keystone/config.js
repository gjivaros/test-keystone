"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core4 = require("@keystone-6/core");

// modules/goupe/groupe.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var Groupe = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)(),
    users: (0, import_fields.relationship)({
      ref: "User",
      many: true
    }),
    messages: (0, import_fields.relationship)({
      ref: "Message.groupe",
      many: true
    })
  }
});

// modules/messages/messages.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var Message = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    content: (0, import_fields_document.document)({
      formatting: true,
      dividers: true,
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1]
      ]
    }),
    createAt: (0, import_fields2.timestamp)({ defaultValue: { kind: "now" } }),
    user: (0, import_fields2.relationship)({ ref: "User.messages" }),
    groupe: (0, import_fields2.relationship)({
      ref: "Groupe.messages",
      isFilterable: true
    })
  }
});

// modules/user/user.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var User = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields3.text)({ validation: { isRequired: true } }),
    email: (0, import_fields3.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields3.password)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields3.timestamp)({
      defaultValue: { kind: "now" }
    }),
    groupes: (0, import_fields3.relationship)({ ref: "Groupe", many: true }),
    messages: (0, import_fields3.relationship)({ ref: "Message.user", many: true })
  }
});

// schema.ts
var lists = {
  User,
  Groupe,
  Message
};

// modules/auth/auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var import_crypto = require("crypto");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core4.config)({
    db: {
      provider: "sqlite",
      url: "file:./data/keystone.db"
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
