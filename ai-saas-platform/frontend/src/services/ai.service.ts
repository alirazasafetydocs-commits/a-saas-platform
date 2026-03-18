import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResume(userData: any, templateId: string) {
  const prompt = `Generate a professional HSE resume for:
Name: ${userData.name}
Experience: ${userData.experience}
Skills: ${userData.skills}
Template: ${templateId}

Format for PDF export.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  return completion.choices[0].message.content;
}

export async function generateWebsite(seoKeywords: string, businessName: string) {
  const prompt = `Generate complete HTML/CSS website for ${businessName} with SEO keywords: ${seoKeywords}. HSE themed if applicable.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  return completion.choices[0].message.content;
}

