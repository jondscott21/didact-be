define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Post User Login",
    "name": "PostLogin",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the existant user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the existant user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"doctest@example.com\",\n  \"password\": \"blahblahblah\",\n  \"first_name\": \"Doc\",\n  \"last_name\": \"Test\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>An object with the user id and username and token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"message\": \"User Created\",\n  \"email\": \"doctest@example.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "bad-request-error",
            "description": "<p>The username or password is missing.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "internal-server-error",
            "description": "<p>The user couldn't be logged in</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "400-Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"missing email or password\"\n}",
          "type": "json"
        },
        {
          "title": "500-Error-Response:",
          "content": "HTTP/1.1 500 Internal-Server-Error\n{\n \"message\": \"Couldn't connect to login service\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./auth/authRouter.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/auth/register",
    "title": "Post User Registration",
    "name": "PostUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the new user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the new user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>The first_name of the new user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>The last_name of the new user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"doctest@example.com\",\n  \"password\": \"blahblahblah\",\n  \"first_name\": \"Doc\",\n  \"last_name\": \"Test\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>An object with the user id, email and token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"token\": \"fkjhfbedof84g3ygf89fgy3qf0897yguf942u7fg84gf\",\n  \"id\": 3,\n  \"email\": \"doctest@example.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "bad-request-error",
            "description": "<p>The username or password is missing.</p>"
          }
        ],
        "409": [
          {
            "group": "409",
            "type": "Object",
            "optional": false,
            "field": "duplicate-email-error",
            "description": "<p>The email is already registered</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "internal-server-error",
            "description": "<p>The user couldn't be registered</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "400-Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"email, password, first_name, and last_name are required\"\n}",
          "type": "json"
        },
        {
          "title": "409-Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n \"message\": \"A user with that email already exists\"\n}",
          "type": "json"
        },
        {
          "title": "500-Error-Response:",
          "content": "HTTP/1.1 500 Internal-Server-Error\n{\n \"message\": \"Error connecting with server\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./auth/authRouter.js",
    "groupTitle": "Authentication"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C__Users_Kaw_Documents_Labs_didact_be_docs_main_js",
    "groupTitle": "C__Users_Kaw_Documents_Labs_didact_be_docs_main_js",
    "name": ""
  }
] });
