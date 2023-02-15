# Generic ChatGPT 

`common-chatgpt` is a Node.js module that provides an easy way to integrate OpenAI's powerful language model, GPT-3, into your **any** chatbot or conversational AI project.

* Setup your ChatGPT in just **`2`** lines 😎

It also includes types for [`models`](#model-types) provided by ChatGPT, so _**no**_ need to remember all the Model names

* ### WhatsApp
![WhatsApp Image showing ChatGPT](https://i.imgur.com/jtF9YI5.png)

* ### Discord
![Discord Image showing ChatGPT](https://imgur.com/135Ebdj.png)
#### Content:
* [Installation](#installation)
* [Usage](#usage)
    * WhatsApp
      * [ Javascript ](#javascript)
      * [ Typescript ](#typescript)
    * Discord
      * [Javascript-D](#javascript-d)

## Installation
```
npm i generic-chatgpt
```

## Usage
* #### WhatsApp
  * ##### Javascript
[whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - Javascript

```js
const { Client } = require('whatsapp-web.js'); // -------------|
const { Chat } = require('common-chatgpt'); //                 |
const qrcode = require('qrcode-terminal'); //                  |-- Client Setup
//                                                             |
const client = new Client(); // -------------------------------|

// setup `chat`                                                    1st `LINE`
const chat = new Chat({
  apiKey: process.env.CHAT_GPT_KEY,
  // ... see configurations and default values below
});


client.on('qr', (qr) => { // ----------------------------------|
  qrcode.generate(qr, { small: true }); //                     |
  console.log('QR RECEIVED', qr); //                           |-- For getting QR, check `whatsapp-web.js`
  //                                                           |
}); // --------------------------------------------------------|

client.on('message_create', async (msg) => {
  if (msg.id.remote === process.env.WA_CHAT_ID && !msg.fromMe) {

    // get response in single line                                 2nd `LINE`
    const chatgpt_response = await chat.getRes(msg.author, msg.body);

    // send it anywhere
    client.sendMessage(process.env.WA_CHAT_ID, chatgpt_response);

  }
});

client.initialize();
```

  * ##### Typescript
[whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - Typescript

```ts
import * as WAWebJS from 'whatsapp-web.js'; // ----------------|
import { Client } from 'whatsapp-web.js'; //                   |
import qrcode from 'qrcode-terminal'; //                       |-- Client Setup
import { Chat } from 'common-chatgpt'; //                      |
const client = new Client({}); // -----------------------------|

// setup `chat`                                                    1st `LINE`
const chat = new Chat({
  apiKey: process.env.CHAT_GPT_KEY as string,
  // ... see configurations and default values below
});

client.on('qr', (qr: string) => { // --------------------------|
  qrcode.generate(qr, { small: true }); //                     |
  console.log('QR RECEIVED', qr); //                           |-- For getting QR, check `whatsapp-web.js`
  //                                                           |
}); // --------------------------------------------------------|

client.on('message_create', async (msg: WAWebJS.Message) => {
  if (msg.id.remote === (process.env.WA_CHAT_ID as string) && !msg.fromMe) {

    // get response in single line                                 2nd `LINE`
    const chatgpt_response = await chat.getRes(msg.author ?? '', msg.body);

    // send it anywhere
    client.sendMessage(process.env.WA_CHAT_ID as string, chatgpt_response);
  }
});

client.initialize();
```
* #### Discord
  * ##### Javascript-D

```js
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { Chat } = require('common-chatgpt'); //                 |
require('dotenv/config'); //                                   |
 //                                                            |
const client = new Client({ //                                 |
  intents: [ //                                                |
    GatewayIntentBits.Guilds, //                               |
    GatewayIntentBits.GuildMessages, //                        |
    GatewayIntentBits.MessageContent, //                       |
  ], //                                                        |-- Client Setup
}); //                                                         |
//                                                             |
client.once(Events.ClientReady, (clientUser) => { //           |
  console.log(`Logged in as ${clientUser.user.tag}`); //       |
}); //                                                         |
 //                                                            |
const BOT_CHANNEL = '1075363634479374376'; //                  |
//                                                             |
client.login(process.env.BOT_TOKEN); // -----------------------|

// setup `chat`                                                    1st `LINE`
const chat = new Chat({
  apiKey: process.env.CHAT_GPT_KEY as string,
    // ... see configurations and default values below
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== BOT_CHANNEL) return;

    // get response in single line                                 2nd `LINE`
  const chatgpt_response = await chat.getRes(
    message.member.displayName,
    message.content
  );

    // send it anywhere
  await message.channel.send(chatgpt_response);
});
```
##### Model types
```
type Model = 'text-davinci-003' | 'text-curie-001' | 'text-babbage-001' | 'text-ada-001';
```

## Contributing

We welcome contributions from anyone who is interested in improving `common-chatgpt`. To get started, please follow these steps:

1. Fork this repository to your own account.
2. Create a new branch with a descriptive name (`git checkout -b my-new-feature`).
3. Implement your new feature or bug fix.
4. Commit your changes with commit messages (`git commit -am 'Add some feature'`).
5. Push your branch to your fork (`git push origin my-new-feature`).
6. Submit a pull request

## Author
[Piyush Duggal](https://github.com/piyushduggal-source)

Email: [duggalpiyush0@gmail.com](mailto:duggalpiyush0@gmail.com)
Checkout my other projects.



## License
The MIT License (MIT)

Copyright (c) 2023 [Piyush Duggal](https://github.com/piyushduggal-source)

