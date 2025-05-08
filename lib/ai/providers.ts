import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { perplexity } from '@ai-sdk/perplexity';
import { openai } from '@ai-sdk/openai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './mock-models';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': xai('grok-2-vision-1212'),
        'chat-model-reasoning': wrapLanguageModel({
          model: xai('grok-3-mini-beta'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': xai('grok-2-1212'),
        'artifact-model': xai('grok-2-1212'),
        // Perplexity dynamic model integration for Pro subscribers
        'perplexity-chat': perplexity('sonar-pro'),
        'perplexity-sonar': perplexity('sonar'),
        'perplexity-sonar-pro': perplexity('sonar-pro'),
        'perplexity-sonar-pro-32k': perplexity('sonar-pro-32k'),
        'perplexity-claude-3.7-sonnet': perplexity('claude-3.7-sonnet'),
        'perplexity-gpt-4.1': perplexity('gpt-4.1'),
        // Add more Perplexity models as needed
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
