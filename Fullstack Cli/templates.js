let initText = `
app init <command>

Usage:

app init --all          creates the folder structure and config file
app init --mk           creates the folder structure and add usage files
app init --cat          creates the config file with default settings
`;

let configText = `
app config <command>

Usage:

app config --show             displays a list of the current config settings
app config --reset            resets the config file with default settings
app config --set              sets a specific config setting
`;

let tokenText = `
app token <command>

Usage:

app token --count             displays a count of the tokens created
app token --new <username>    generates a token for a given username, saves tokens to the json file
app token --add p <username> <phone>
app token --add e <username> <email>
app token --search u <username>  fetches a token for a given username
app token --search e <email>  fetches a token for a given email
app token --search p <phone>  fetches a token for a given phone number
`;

const configJson = {
  name: "AppConfigCLI",
  version: "1.0.0",
  description: "The Command Line Interface (CLI) for the App.",
  main: "app.js",
  superuser: "adm1n",
};

module.exports = {
  initText,
  configText,
  tokenText,
  configJson,
};
