import { OpenAIApi, Configuration } from 'openai';

type Model =
  | 'text-davinci-003'
  | 'text-curie-001'
  | 'text-babbage-001'
  | 'text-ada-001';

interface Options {
  apiKey: string;
  model?: Model;
  maxToken?: number;
}

export class Chat {
  private apiKey: string;
  private model: string;
  private maxToken: number;
  constructor(options: Options) {
    this.apiKey = options.apiKey;
    this.model = options.model ?? 'text-davinci-003';
    this.maxToken = options.maxToken ?? 300;
  }

  async getRes(userName: string, content: string) {
    const config = new Configuration({
      apiKey: this.apiKey,
    });

    const openai = new OpenAIApi(config);
    let response = await openai
      .createCompletion({
        prompt: `ChatGPT is a friendly chatbot. \n\
        ChatGPT : Hello, how are you?\n\
        ${userName}: ${content}\n\
        ChatGPT:`,
        model: this.model,
        max_tokens: this.maxToken,
        stop: ['\n'],
      })
      .then((res) => {
        return res.data.choices[0].text as string;
      })
      .catch((e) => {
        return e.message;
      });

    return response;
  }
}
