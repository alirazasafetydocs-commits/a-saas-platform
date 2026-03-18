import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY || 'sk-proj-fake-key-for-dev',
});

const resumeSchema = z.object({
  jobTitle: z.string(),
  experience: z.array(z.object({ role: z.string(), company: z.string(), duration: z.string() })),
  skills: z.array(z.string()),
  education: z.string(),
});

const coverSchema = z.object({
  jobTitle: z.string(),
  company: z.string(),
  experience: z.string(),
});

export const generateResume = async (data: any) => {
  try {
    const { jobTitle, experience, skills, education } = resumeSchema.parse(data);
    
    const prompt = `Generate a professional resume for ${jobTitle}.

Experience:
${experience.map((exp: any) => `- ${exp.role} at ${exp.company} (${exp.duration})`).join('\\n')}

Skills: ${skills.join(', ')}
Education: ${education}

Format as markdown with sections: Contact, Summary, Experience, Skills, Education.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return { 
      content: completion.choices[0]?.message?.content || 'Error generating resume',
      format: 'markdown'
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const generateCoverLetter = async (data: any) => {
  try {
    const { jobTitle, company, experience } = coverSchema.parse(data);

    const prompt = `Write a compelling cover letter for ${jobTitle} position at ${company}.

Key experience: ${experience}

Structure:
1. Introduction with position/company enthusiasm
2. 2-3 paragraphs highlighting relevant experience/skills
3. Strong closing call-to-action

Professional tone, 3-4 paragraphs.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return { 
      content: completion.choices[0]?.message?.content || 'Error generating cover letter',
      format: 'text'
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const generateHSEDocs = async (data: any) => {
  const hseSchema = z.object({
    company: z.string(),
    industry: z.string(),
    location: z.string(),
    specificReq: z.string().optional(),
  });
  try {
    const { company, industry, location, specificReq } = hseSchema.parse(data);
    const prompt = `Generate comprehensive HSE (Health, Safety, Environment) policy document for ${company}, ${industry} industry, located in ${location}.
${specificReq ? `Specific requirements: ${specificReq}` : ''}

Include sections:
1. Policy Statement
2. Responsibilities
3. Risk Assessment
4. Emergency Procedures
5. Training
6. Incident Reporting

Professional format, markdown, actionable.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return { 
      content: completion.choices[0]?.message?.content || 'Error generating HSE docs',
      format: 'markdown'
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const generateWebsite = async (data: any) => {
  const websiteSchema = z.object({
    type: z.enum(['landing', 'portfolio', 'blog', 'ecommerce']),
    businessName: z.string(),
    description: z.string(),
    features: z.array(z.string()).optional(),
  });
  try {
    const { type, businessName, description, features } = websiteSchema.parse(data);
    const prompt = `Generate complete responsive HTML/CSS/JS code for a ${type} website for ${businessName}.

Description: ${description}
Features: ${features ? features.join(', ') : 'modern design, responsive'}

Use TailwindCSS CDN, modern design, sections: Hero, About, Services, Contact.
Full working single page app, no backend needed.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return { 
      content: completion.choices[0]?.message?.content || 'Error generating website',
      format: 'html'
    };
  } catch (error: any) {
    return { error: error.message };
  }
};


