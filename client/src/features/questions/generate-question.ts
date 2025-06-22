'use server';

import { Question } from './types';

export type GenerateQuestionData = {
  topicTitle?: string;
  existingQuestions?: string[];
};

export async function generateQuestion(data: GenerateQuestionData) {
  const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Api-Key ${process.env.NEXT_PUBLIC_YANDEX_API_KEY}`,
    },
    cache: 'no-cache',
    next: { revalidate: 0 },
    body: JSON.stringify({
      modelUri: `gpt://${process.env.NEXT_PUBLIC_YANDEX_FOLDER_ID}/yandexgpt`,
      completionOptions: {
        stream: false,
        temperature: 0.6, // Creativity level
        maxTokens: '1000',
      },
      messages: [
        {
          role: 'system',
          text: 'Ты – ассистент, который помогает пользователю генерировать вопросы для теста. Используй название темы и уже существующие вопросы, чтобы создать новый вопрос. Ответ должен быть в формате JSON с полями: question - текст вопроса; type - тип вопроса (возможные значения: "text", "radio", "checkbox"); answerOptions - массив строк, которые представляют собой варианты ответа (если type = "text", то нужно передать пустой массив []); correctAnswer - строка, представляющая правильный ответ (если type = "radio" или "checkbox", то нужно через запятую перечислить индексы правильных ответов из массива answerOptions).',
        },
        {
          role: 'user',
          text: `Мне нужно сгенерировать новый вопрос типа "checkbox". ${data.topicTitle ? `Тема: "${data.topicTitle}". ` : ''}${data.existingQuestions && data.existingQuestions.length > 0 ? `У меня уже есть вот такой список вопросов: [${data.existingQuestions.map((q) => `"${q}"`).join(', ')}] ` : ''}Пожалуйста, создай новый вопрос.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate question');
  }
  return await response
    .json()
    .then<
      Pick<Question, 'question' | 'answerOptions' | 'correctAnswer' | 'type'>
    >((res) => JSON.parse((res.result.alternatives[0].message.text as string).replaceAll('```', '').trim()));
}
