const greeting = `
<html lang="en">
  <head>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
      body {
        font-family: Rubik, sans-serif;
        background-color: rgb(74, 8, 6);
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      .container {
        background-color: #ffffff;
        border-radius: 10px;
        padding: 40px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      h1 {
        color: #333;
        font-size: 36px;
        margin-bottom: 10px;
      }

      p {
        color: #666;
        font-size: 18px;
      }

      .api-link {
        font-size: 20px;
        color: #007bff;
        text-decoration: none;
      }

      .api-link:hover {
        color: rgb(74, 8, 6);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="https://ibb.co/3MQJw2J"
        ><img
          src="https://i.ibb.co/8dthJqh/Screenshot-2023-10-16-at-11-07-35-PM.png"
          alt="eBuzz Logo"
          border="0"
          height="100"
          width="75%"
          align="center"
      /></a>
      <h1>Welcome to the eBuzz API</h1>
      <p>Your source for all things eBuzz!</p>
      <p>Explore our API to get started.</p>
      <a
        class="api-link"
        href="https://documenter.getpostman.com/view/14719733/2s9YR83Ccx"
        >Click to Access the API Documentation</a
      >
    </div>
  </body>
</html>
`

module.exports = greeting;